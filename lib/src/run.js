import fs from "fs";
import "dotenv/config";
import { connectredis } from "./redis.js";

const redis = await connectredis();

const worker_running = [
  "https://workers-judge.onrender.com/",
  "https://workers-judge-1.onrender.com/",
  "https://workers-judge-2.onrender.com/",
];

/**
 * Judge Function
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
    throw new Error(
      "codePath, ques_name, timeout, sizeout, and language are required"
    );
  }

  let code;
  try {
    // 1. Read user code
    code = fs.readFileSync(codePath, "utf-8");

    // Security checks
    if (code.includes("fopen") || code.includes("system") || code.includes("fork")) {
      throw new Error("Potentially dangerous code detected.");
    }

    // 2. Split inputs & outputs
    const inputParts = input.split("###").map(s => s.trim()).filter(Boolean);
    const outputParts = output.split("###").map(s => s.trim()).filter(Boolean);

    if (inputParts.length !== outputParts.length) {
      throw new Error("Number of inputs and outputs do not match!");
    }

    // 3. Build testcases array
    const testcases = inputParts.map((inp, i) => ({
      input: inp,
      expected_output: outputParts[i],
      correct: null,
      timeout: timeout || 2.5,
      sizeout,
      result: null,
    }));

    const totalWorkers = worker_running.length;
    const minPerWorker = 100;
    const workerTaskMap = {};

    // Distribute test cases among workers
    if (testcases.length <= minPerWorker) {
      workerTaskMap["worker_0"] = testcases;
    } else {
      let idx = 0;
      for (const tc of testcases) {
        const workerId = `worker_${Math.floor(idx / minPerWorker) % totalWorkers}`;
        if (!workerTaskMap[workerId]) workerTaskMap[workerId] = [];
        workerTaskMap[workerId].push(tc);
        idx++;
      }
    }

    // 4. Store data in Redis and push jobs to queue
    await Promise.all(
      Object.entries(workerTaskMap).map(async ([workerId, tcList]) => {
        const redisPayload = {
          code,
          language,
          testcases: JSON.stringify(tcList),
        };

        const redisKey = `job:${ques_name}:worker:${workerId}`;

        // Store test cases for this worker
        await redis.hSet(redisKey, redisPayload);

        // Push job to queue - FIXED: Store the Redis key instead of JSON object
        await redis.lPush("job_queue", redisKey);
      })
    );

    console.log(`[INFO] Job ${ques_name} queued for ${Object.keys(workerTaskMap).length} workers`);

    // 5. Wait until all workers complete
    const waitUntilCompleted = async () => {
      const POLL_INTERVAL = 500; // ms
      const MAX_ATTEMPTS = 120;   // Increased to 60 sec total
      let attempts = 0;

      while (attempts < MAX_ATTEMPTS) {
        const status = await redis.hGetAll(`job:${ques_name}:status`);
        if (Object.keys(status).length === Object.keys(workerTaskMap).length) {
          return true;
        }
        await new Promise(res => setTimeout(res, POLL_INTERVAL));
        attempts++;
      }
      return false;
    };

    const completed = await waitUntilCompleted();
    if (!completed) {
      throw new Error(`Timeout waiting for workers to finish for job ${ques_name}`);
    }

    // 6. Collect results from all workers
    const results = [];
    for (const workerId of Object.keys(workerTaskMap)) {
      const redisKey = `job:${ques_name}:worker:${workerId}:results`;
      const data = await redis.get(redisKey);
      if (data) {
        results.push(...JSON.parse(data));
      }
    }

    console.log(`[SUCCESS] Completed job ${ques_name}`);
    return {
      jobId: ques_name,
      results,
    };
  } catch (err) {
    console.error("[ERROR] Judge Error:", err);
    throw err;
  } finally {
    // Cleanup uploaded code file
    if (fs.existsSync(codePath)) {
      fs.unlinkSync(codePath);
    }
  }
}