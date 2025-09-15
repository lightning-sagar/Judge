import fs from "fs";
import "dotenv/config";
import { connectredis } from "./redis.js";

const worker_running = [
  "https://workers-judge.onrender.com/",
  "https://workers-judge-1.onrender.com/",
  "https://workers-judge-2.onrender.com/",
];

const redis = await connectredis();

/**
 * @param {string} codePath - Absolute path to uploaded code file
 * @param {string} ques_name - Unique job/question ID
 * @param {string} input - Raw input test cases (separated by ###)
 * @param {string} output - Raw expected outputs (separated by ###)
 * @param {string} timeout - Max timeout in seconds
 * @param {string} sizeout - Max output size in KB
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
  if (!codePath || !ques_name || !timeout || !sizeout || !language)
    throw new Error("codePath and ques_name are required");

  let code;
  try {
    code = fs.readFileSync(codePath, "utf-8");

    if (
      code.includes("fopen") ||
      code.includes("system") ||
      code.includes("fork")
    ) {
      throw new Error("Potentially dangerous code detected.");
    }

    const inputParts = input
      .split("###")
      .map((s) => s.trim())
      .filter(Boolean);
    const outputParts = output
      .split("###")
      .map((s) => s.trim())
      .filter(Boolean);

    const testcases = inputParts.map((input, i) => ({
      input,
      expected_output: outputParts[i],
      correct: null,
      timeout:timeout || 2.5,
      sizeout,
      result: null,
    }));

    const workerCount = worker_running.length;
    const workerTaskMap = {};

    if (testcases.length < 3) {
      workerTaskMap['worker_0'] = testcases;
    } else {
      testcases.forEach((tc, i) => {
        const workerId = `worker_${i % workerCount}`;
        if (!workerTaskMap[workerId]) workerTaskMap[workerId] = [];
        workerTaskMap[workerId].push(tc);
      });
    }

    const redisPayload = {
      code,
      language,
      ...Object.fromEntries(
        Object.entries(workerTaskMap).map(([k, v]) => [k, JSON.stringify(v)])
      ),
    };

    await redis.hSet(ques_name, redisPayload);
    const assignedWorkers = Object.keys(workerTaskMap);

    await Promise.all(
      assignedWorkers.map(() => redis.lPush("job_queue", ques_name))
    );

    const waitUntilCompleted = async () => {
      const POLL_INTERVAL = 500;
      const MAX_ATTEMPTS = 60;
      let attempts = 0;

      while (attempts < MAX_ATTEMPTS) {
        const status = await redis.hGetAll(`job:${ques_name}:status`);
        const completed = Object.keys(status).filter(
          (k) => status[k] === "completed"
        );
        if (assignedWorkers.every((worker) => completed.includes(worker)))
          return true;
        await new Promise((res) => setTimeout(res, POLL_INTERVAL));
        attempts++;
      }

      return false;
    };

    const completed = await waitUntilCompleted();

    if (!completed) {
      throw new Error("Timeout waiting for workers to finish");
    }

    const results = [];
    for (const workerId of assignedWorkers) {
      const data = await redis.get(`job:${ques_name}:worker:${workerId}`);
      if (data) results.push(...JSON.parse(data));
    }

    return {
      jobId: ques_name,
      results,
    };
  } catch (err) {
    console.log(err);
  } finally {
    if (fs.existsSync(codePath)) {
      fs.unlinkSync(codePath);
    }
  }
}