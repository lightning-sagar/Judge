import fs from "fs";
import "dotenv/config";
import { connectredis } from "./redis.js";

const redis = await connectredis();

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
    // 1. Read submitted code
    code = fs.readFileSync(codePath, "utf-8");

    // 2. Validate code for dangerous functions
    const dangerous = ["fopen", "system", "fork", "exec", "eval", "import os", "subprocess"];
    for (const keyword of dangerous) {
      if (code.includes(keyword)) {
        throw new Error(`Potentially dangerous code detected: ${keyword}`);
      }
    }

    // 3. Prepare test cases
    const inputParts = input.split("###").map(s => s.trim()).filter(Boolean);
    const outputParts = output.split("###").map(s => s.trim()).filter(Boolean);

    if (inputParts.length !== outputParts.length) {
      throw new Error(
        `Mismatch between input (${inputParts.length}) and output (${outputParts.length})`
      );
    }

    const testcases = inputParts.map((inp, i) => ({
      input: inp,
      expected_output: outputParts[i],
      correct: null,
      timeout: timeout || 2.5,
      sizeout,
      result: null,
    }));

    // 4. Clean old data for this job
    const pipeline = redis.multi();
    pipeline.del(`testcase_queue:${ques_name}`);
    pipeline.del(`results_queue:${ques_name}`);
    pipeline.del(`job:${ques_name}:status`);
    pipeline.del(ques_name);
    pipeline.del(`job:${ques_name}:result`);
    await pipeline.exec();

    // 5. Save code + metadata
    await redis.hSet(ques_name, {
      code,
      language,
      totalTestCases: testcases.length.toString(),
      timeout: timeout.toString(),
      sizeout: sizeout.toString(),
      createdTime: Date.now().toString(),
    });

    // 6. Split testcases into batches of 100
    const BATCH_SIZE = 100;
    const batches = [];
    for (let i = 0; i < testcases.length; i += BATCH_SIZE) {
      batches.push(testcases.slice(i, i + BATCH_SIZE));
    }

    console.log(
      `Splitting into ${batches.length} batches of up to ${BATCH_SIZE} test cases each`
    );

    // 7. Push each batch to Redis queue
    for (let i = 0; i < batches.length; i++) {
      const batchName = `${ques_name}_batch_${i + 1}`;
      await redis.rPush(`testcase_queue:${batchName}`, JSON.stringify(batches[i]));
      await redis.lPush("job_queue", batchName);  // push unique batch name
    }


    // 8. Initialize job status
    await redis.hSet(`job:${ques_name}:status`, {
      status: "queued",
      totalBatches: batches.length.toString(),
      completedBatches: "0",
      createdTime: Date.now().toString(),
    });

    console.log(`[DEBUG] Job ${ques_name} queued with ${batches.length} batches`);

    // 9. Wait for job completion
    const waitUntilCompleted = async () => {
      const POLL_INTERVAL = 1000; // ms
      const MAX_ATTEMPTS = 120; // 30 seconds
      let attempts = 0;

      while (attempts < MAX_ATTEMPTS) {
        const status = await redis.hGetAll(`job:${ques_name}:status`);

        const totalBatches = parseInt(status.totalBatches || "0", 10);
        const completedBatches = parseInt(status.completedBatches || "0", 10);

        console.log(
          `[DEBUG] Polling... Completed ${completedBatches}/${totalBatches} batches`
        );

        if (completedBatches === totalBatches && totalBatches > 0) {
          return true;
        }

        await new Promise((res) => setTimeout(res, POLL_INTERVAL));
        attempts++;
      }

      return false;
    };

    const completed = await waitUntilCompleted();
    if (!completed) {
      throw new Error("Timeout waiting for workers to finish");
    }

    const finalData = await redis.get(`job:${ques_name}:result`);
    let results = [];
    if (finalData) {
      try {
        results = JSON.parse(finalData);
      } catch (err) {
        console.error("Error parsing job result JSON:", err);
      }
    } else {
      console.warn(`[WARN] No results found for job ${ques_name}`);
    }
    return {
      status: "completed",
      jobId: ques_name,
      totalTestCases: testcases.length,
      totalBatches: batches.length,
      results,
    };

  } catch (err) {
    console.error("Judge error:", err.message);
    throw err;
  } finally {
    if (codePath && fs.existsSync(codePath)) {
      fs.unlinkSync(codePath);
      console.log(`Cleaned up uploaded code file: ${codePath}`);
    }
  }
}
