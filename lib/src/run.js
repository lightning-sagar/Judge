import fs from "fs";
import "dotenv/config";
import { connectredis } from "./redis.js";

const redis = await connectredis();

// This should be dynamically discovered later via Redis or service discovery
const worker_running = [
  "https://workers-judge.onrender.com/",
  "https://workers-judge-1.onrender.com/",
  "https://workers-judge-2.onrender.com/",
];

/**
 * Judge Function
 * @param {string} codePath - Absolute path to uploaded code file
 * @param {string} language - Programming language
 * @param {string} ques_name - Unique job/question ID
 * @param {string} input - Raw input test cases (separated by ###)
 * @param {string} output - Raw expected outputs (separated by ###)
 * @param {number} timeout - Max timeout per testcase in seconds
 * @param {number} sizeout - Max output size in KB
 */
export async function judge({
  codePath,
  language,
  ques_name,
  input,
  output,
  timeout,
  sizeout,
}) {
  if (!codePath || !ques_name || !timeout || !sizeout || !language) {
    throw new Error("codePath, ques_name, timeout, sizeout, and language are required");
  }

  let code;
  try {
    // Read user code
    code = fs.readFileSync(codePath, "utf-8");

    // Security checks
    if (code.includes("fopen") || code.includes("system") || code.includes("fork")) {
      throw new Error("Potentially dangerous code detected.");
    }

    // Split inputs & outputs
    const inputParts = input.split("###").map((s) => s.trim()).filter(Boolean);
    const outputParts = output.split("###").map((s) => s.trim()).filter(Boolean);

    if (inputParts.length !== outputParts.length) {
      throw new Error("Number of inputs and outputs do not match!");
    }

    // Build testcases array
    const testcases = inputParts.map((input, i) => ({
      input,
      expected_output: outputParts[i],
      correct: null,
      timeout: timeout || 2.5,
      sizeout,
      result: null,
    }));

    // At least 150 testcases per worker
    const totalWorkers = worker_running.length;
    let minPerWorker = 150;
    const workerTaskMap = {};

    if (testcases.length <= minPerWorker) {
      // All testcases go to a single worker
      workerTaskMap["worker_0"] = testcases;
    } else {
      // Distribute evenly while ensuring each worker gets at least 150 testcases
      let idx = 0;
      for (let tc of testcases) {
        const workerId = `worker_${Math.floor(idx / minPerWorker) % totalWorkers}`;
        if (!workerTaskMap[workerId]) workerTaskMap[workerId] = [];
        workerTaskMap[workerId].push(tc);
        idx++;
      }
    }

    // Store data in Redis for each worker
    await Promise.all(
      Object.entries(workerTaskMap).map(async ([workerId, tcList]) => {
        const redisPayload = {
          code,
          language,
          testcases: JSON.stringify(tcList),
        };

        // Each worker gets its own redis entry
        await redis.hSet(ques_name, redisPayload);

        // Push job to queue
        await redis.lPush("job_queue", ques_name);
      })
    );

    // Track completion
    const waitUntilCompleted = async () => {
      const POLL_INTERVAL = 500;
      const MAX_ATTEMPTS = 60;
      let attempts = 0;

      while (attempts < MAX_ATTEMPTS) {
        const status = await redis.hGetAll(`job:${ques_name}:status`);
        const completed = Object.keys(status).filter((k) => status[k] === "completed");

        // If all assigned workers are done
        if (completed.length === Object.keys(workerTaskMap).length) return true;

        await new Promise((res) => setTimeout(res, POLL_INTERVAL));
        attempts++;
      }
      return false;
    };

    const completed = await waitUntilCompleted();
    if (!completed) {
      throw new Error("Timeout waiting for workers to finish");
    }

    // Collect results
    const results = [];
    for (const workerId of Object.keys(workerTaskMap)) {
      const data = await redis.get(`job:${ques_name}:worker:${workerId}`);
      if (data) results.push(...JSON.parse(data));
    }

    return {
      jobId: ques_name,
      results,
    };
  } catch (err) {
    console.error("Judge Error:", err);
    throw err;
  } finally {
    // Cleanup uploaded code file
    if (fs.existsSync(codePath)) {
      fs.unlinkSync(codePath);
    }
  }
}
