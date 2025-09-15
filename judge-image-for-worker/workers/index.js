// worker-updated.js
import express from "express";
import fs from "fs";
import path from "path";
import { exec, spawn } from "child_process";
import { fileURLToPath } from "url";
import os from "os";
import "dotenv/config";
import cors from "cors";
import { connectredis } from "./redis/redis.js";

const app = express();

const allowedOrigins = [
  "https://judge-lib-mg91.vercel.app",
  "https://judge-lib-mg91.vercel.app/npm",
  "http://localhost:3000/",
  "https://judge-lib-mg91.vercel.app/microservice",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Unique worker/pod name for logging
const WORKER_FIELD =
  process.env.WORKER_FIELD?.trim() ||
  `worker_${os.hostname()}_${Math.floor(Date.now() / 1000)}`;

console.log("Resolved Worker ID at startup:", WORKER_FIELD);

const port = 5000;
const redis_server = await connectredis();

// ---------- helpers ----------
async function compileCode(language, codePath, execPath) {
  return new Promise((resolve, reject) => {
    if (language === "cpp") {
      exec(
        `g++ "${codePath}" -o "${execPath}"`,
        { timeout: 10000 },
        (err, _, stderr) => {
          if (err) return reject("C++ Compilation Error:\n" + stderr);
          resolve();
        }
      );
    } else if (language === "java") {
      exec(`javac "${codePath}"`, { timeout: 10000 }, (err, _, stderr) => {
        if (err) return reject("Java Compilation Error:\n" + stderr);
        resolve();
      });
    } else {
      // python/no-compile languages
      resolve();
    }
  });
}

function runTestcase(language, execPath, input, expected_output, timeoutSec, ques_name) {
  return new Promise((resolve) => {
    const timeoutMs = timeoutSec * 1000;
    let run;
    try {
      if (language === "cpp") {
        run = spawn(execPath, [], { stdio: ["pipe", "pipe", "pipe"] });
      } else if (language === "java") {
        // execPath should be the directory containing .class files
        run = spawn("java", ["Main"], { cwd: execPath, stdio: ["pipe", "pipe", "pipe"] });
      } else if (language === "python" || language === "py") {
        const pythonCmd = process.platform === "win32" ? "python" : "python3";
        run = spawn(pythonCmd, [execPath], { stdio: ["pipe", "pipe", "pipe"] });
      } else {
        return resolve({ input, expected_output, result: `Unsupported language: ${language}`, correct: false });
      }
    } catch (err) {
      return resolve({ input, expected_output, result: `Failed to spawn: ${err.message}`, correct: false });
    }

    let result = "";
    let errorOutput = "";
    run.stdout.on("data", (d) => (result += d.toString()));
    run.stderr.on("data", (d) => (errorOutput += d.toString()));

    const timer = setTimeout(() => {
      try { run.kill("SIGKILL"); } catch (_) {}
    }, timeoutMs);

    run.stdin.write(input.replace(/\r\n/g, "\n").trim() + "\n");
    run.stdin.end();

    run.on("close", (code) => {
      clearTimeout(timer);
      let correct = false;
      if (code === 0 && expected_output !== undefined && expected_output !== null) {
        correct = result.trim() === expected_output.trim();
      } else if (code === null) {
        result = `Timeout exceeded (${timeoutMs}ms)`;
      } else if (code !== 0) {
        result = `Runtime error (exit code ${code})\n${errorOutput}`;
      }
      resolve({ input, expected_output, result, correct, timeout: timeoutSec });
    });
  });
}

// processJob now accepts the assignedWorkerId (the slot that judge created)
async function processJob(ques_name, code, language, testcases, assignedWorkerId) {
  const extension = language === "cpp" ? "cpp" : language === "java" ? "java" : "py";
  const fileName = `${ques_name.replace(/\s+/g, "_")}_${WORKER_FIELD}_${Date.now()}.${extension}`;
  const filePath = path.join(__dirname, fileName);
  const execPath = language === "java" ? __dirname : filePath.replace(/\.\w+$/, language === "cpp" ? ".exe" : ".py");

  fs.writeFileSync(filePath, code);

  try {
    await compileCode(language, filePath, execPath);

    // Run all testcases (parallel for speed)
    const results = await Promise.all(
      testcases.map((tc) =>
        runTestcase(language, execPath, tc.input, tc.expected_output, tc.timeout || 2.5, ques_name)
      )
    );

    // Save results to a deterministic key that judge will read:
    // job:<ques_name>:worker:<assignedWorkerId>:results
    await redis_server.setEx(
      `job:${ques_name}:worker:${assignedWorkerId}:results`,
      120,
      JSON.stringify(results)
    );

    // Mark status for that worker slot. Value contains which pod actually ran it.
    await redis_server.hSet(`job:${ques_name}:status`, {
      [assignedWorkerId]: WORKER_FIELD,
    });
    await redis_server.expire(`job:${ques_name}:status`, 120);

    console.log(`Completed job ${ques_name} slot ${assignedWorkerId} by pod ${WORKER_FIELD}`);
  } catch (err) {
    console.error("Error during job processing:", err);

    await redis_server.setEx(
      `job:${ques_name}:worker:${assignedWorkerId}:results`,
      120,
      JSON.stringify([{ error: err.toString() }])
    );
    await redis_server.hSet(`job:${ques_name}:status`, {
      [assignedWorkerId]: WORKER_FIELD,
    });
  } finally {
    // cleanup
    try { fs.unlinkSync(filePath); } catch (_) {}
    try {
      if (language === "cpp") fs.unlinkSync(execPath);
      if (language === "java") fs.unlinkSync(filePath.replace(".java", ".class"));
    } catch (_) {}
  }
}

// ---------- main queue loop ----------
async function pollForJobs() {
  while (true) {
    try {
      // brPop returns object like { key, element } where element is the pushed string or Buffer
      const br = await redis_server.brPop("job_queue", 0);
      if (!br || !br.element) continue;

      // --- robust parse of queue item ---
      const raw = br.element;
      const elemStr = Buffer.isBuffer(raw) ? raw.toString() : String(raw).trim();

      let payload;
      try {
        payload = JSON.parse(elemStr);
      } catch (err) {
        // fallback to legacy/raw redis-key form
        console.warn("Queue item not JSON, treating as simple jobId:", elemStr);
        // if judge previously pushed raw redisKey, use that as redisKey as well
        payload = { ques_name: elemStr, workerId: null, redisKey: elemStr };
      }

      // Prefer payload.redisKey if provided by judge
      const { ques_name, workerId, redisKey: rkFromPayload } = payload;
      const redisKey = rkFromPayload
        ? rkFromPayload
        : workerId
          ? `job:${ques_name}:worker:${workerId}`
          : `job:${ques_name}`;

      console.log(`Got job payload: ${JSON.stringify(payload)} (using redisKey=${redisKey}) by pod ${WORKER_FIELD}`);

      // job was stored using hSet(redisKey, { code, language, testcases })
      const code = await redis_server.hGet(redisKey, "code");
      const language = await redis_server.hGet(redisKey, "language");
      const data_testcases = await redis_server.hGet(redisKey, "testcases");

      if (!data_testcases) {
        console.warn(`No testcases found for redisKey=${redisKey} payload=${JSON.stringify(payload)}`);
        // continue to next queue item
        continue;
      }

      const testcases = JSON.parse(data_testcases);

      // Process this worker-slot (if workerId present, pass it; else process whole job)
      const assignedWorkerId = workerId || WORKER_FIELD;
      await processJob(ques_name, code, language, testcases, assignedWorkerId);
    } catch (err) {
      console.error("Error while polling job:", err);
      // small backoff to avoid tight error loop
      await new Promise((r) => setTimeout(r, 500));
    }
  }
}

pollForJobs();

// health endpoint
app.get("/ping", (req, res) => {
  res.send(`Worker ${WORKER_FIELD} is awake`);
});

app.listen(port, () => {
  console.log(`${WORKER_FIELD} running at port ${port}`);
});
