import fs from "fs";
import "dotenv/config";
import { connectredis } from "./redis.js";

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
    throw new Error("Missing required fields");

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
      timeout: timeout || 2.5,
      sizeout,
      result: null,
    }));

    for (let i = 0; i < testcases.length; i++) {
      const taskPayload = {
        code,
        language,
        input: testcases[i].input,
        expected_output: testcases[i].expected_output,
        timeout,
        sizeout,
        jobId: `${ques_name}:${i}`,
        ques_name,
        index: i,
      };
      await redis.lPush("job_queue", JSON.stringify(taskPayload));
    }

    // Wait for completion
    const waitUntilCompleted = async () => {
      const results = [];
      let completed = 0;
      const MAX_ATTEMPTS = 60;
      const POLL_INTERVAL = 500;
      let attempts = 0;

      while (completed < testcases.length && attempts < MAX_ATTEMPTS) {
        for (let i = 0; i < testcases.length; i++) {
          const resultKey = `job:${ques_name}:${i}`;
          const result = await redis.get(resultKey);
          if (result && !results[i]) {
            results[i] = JSON.parse(result);
            completed++;
          }
        }

        if (completed < testcases.length) {
          await new Promise((res) => setTimeout(res, POLL_INTERVAL));
          attempts++;
        }
      }

      if (completed < testcases.length) return null;
      return results;
    };

    const results = await waitUntilCompleted();

    if (!results) {
      throw new Error("Timeout waiting for workers to finish");
    }

    return {
      jobId: ques_name,
      results,
    };
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (fs.existsSync(codePath)) {
      fs.unlinkSync(codePath);
    }
  }
}
