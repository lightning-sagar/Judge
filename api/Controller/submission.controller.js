import fs from 'fs';
// import path from 'path';
import { connectredis } from '../db/redis/redis.js';
// import { fileURLToPath } from 'url';

const redis = await connectredis();

const worker_running = ['https://workers-judge.onrender.com/', 'https://workers-judge-1.onrender.com/', 'https://workers-judge-2.onrender.com/'];
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const run = async (req, res) => {
  const { file } = req;
  const { ques_name, timeout, sizeout,input,output,language } = req.body;

  if (!file || !ques_name ) {
    return res.status(404).json({ error: 'All fields are required' });
  }

  try {
    const input_read = input
    const output_read = output
    const code = fs.readFileSync(file.path, 'utf-8');

    if (code.includes("fopen") || code.includes("system") || code.includes("fork")) {
        throw new Error("Potentially dangerous code detected.");
    }

    const inputParts = input_read
      .split('###')
      .map(part => part.trim())
      .filter(part => part.length > 0);

    const outputParts = output_read
      .split('###')
      .map(part => part.trim())
      .filter(part => part.length > 0);

    const testcases = inputParts.map((input, i) => ({
      input,
      expected_output: outputParts[i],
      correct: null,
      timeout:timeout || 2.5,
      sizeout,
      result: null
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
        Object.entries(workerTaskMap).map(([key, val]) => [key, JSON.stringify(val)])
      )
    };

    await redis.hSet(ques_name, redisPayload);
    const assignedWorkers = Object.keys(workerTaskMap);

    await Promise.all(
        assignedWorkers.map(() => redis.lPush('job_queue', ques_name))
    );


    fs.unlinkSync(file.path);


    const waitUntilCompleted = async () => {
      const POLL_INTERVAL = 500;
      const MAX_ATTEMPTS = 60;  
      let attempts = 0;

      while (attempts < MAX_ATTEMPTS) {
        const status = await redis.hGetAll(`job:${ques_name}:status`);
        const completedWorkers = Object.keys(status).filter(k => status[k] === 'completed');

        if (assignedWorkers.every(worker => completedWorkers.includes(worker))) {
          return true;
        }

        await new Promise(res => setTimeout(res, POLL_INTERVAL));
        attempts++;
      }
      return false;
    };

    const completed = await waitUntilCompleted();

    if (!completed) {
      return res.status(504).json({ error: 'Timeout waiting for workers to finish' });
    }
    console.log(`job:${ques_name}`)
    const results = [];
    for (const workerId of assignedWorkers) {
      const data = await redis.get(`job:${ques_name}:worker:${workerId}`);
      if (data) {
        results.push(...JSON.parse(data));
      }
    }

    return res.json({
      message: 'All workers completed',
      jobId: ques_name,
      results
    });

  } catch (error) {
    console.error("Error in /run:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export {run}; 