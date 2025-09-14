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

// Allowed origins
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

// Unique worker ID
const WORKER_FIELD = process.env.WORKER_FIELD?.trim() || `worker_${os.hostname()}_${Math.floor(Date.now() / 1000)}`;

console.log("Worker ID:", WORKER_FIELD);

const port = 5000;
const redis_server = await connectredis();


// -----------------------------------
// Code Compilation Logic
// -----------------------------------
async function compileCode(language, codePath, execPath) {
  return new Promise((resolve, reject) => {
    if (language === "cpp") {
      exec(`g++ "${codePath}" -o "${execPath}"`, { timeout: 10000 }, (err, _, stderr) => {
        if (err) return reject("C++ Compilation Error:\n" + stderr);
        resolve();
      });
    } else if (language === "java") {
      exec(`javac "${codePath}"`, { timeout: 10000 }, (err, _, stderr) => {
        if (err) return reject("Java Compilation Error:\n" + stderr);
        resolve();
      });
    } else {
      resolve(); // Python or interpreted languages don’t need compilation
    }
  });
}

// -----------------------------------
// Testcase Execution Logic
// -----------------------------------
function runTestcase(language, execPath, input, expected_output, timeoutSec, ques_name) {
  return new Promise((resolve) => {
    const timeoutMs = timeoutSec * 1000;
    let run;

    try {
      if (language === "cpp") {
        run = spawn(execPath, [], { stdio: ["pipe", "pipe", "pipe"] });
      } else if (language === "java") {
        run = spawn("java", ["Main"], { cwd: execPath, stdio: ["pipe", "pipe", "pipe"] });
      } else if (language === "python" || language === "py") {
        const pythonCmd = process.platform === "win32" ? "python" : "python3";
        run = spawn(pythonCmd, [execPath], { stdio: ["pipe", "pipe", "pipe"] });
      } else {
        return resolve({
          input,
          expected_output,
          result: `Unsupported language: ${language}`,
          correct: false,
        });
      }
    } catch (err) {
      return resolve({
        input,
        expected_output,
        result: `Failed to spawn process for ${language}: ${err.message}`,
        correct: false,
      });
    }

    let result = "";
    let errorOutput = "";

    run.stdout.on("data", (data) => (result += data.toString()));
    run.stderr.on("data", (data) => (errorOutput += data.toString()));

    const timer = setTimeout(() => run.kill("SIGKILL"), timeoutMs);

    run.stdin.write(input.replace(/\r\n/g, "\n").trim() + "\n");
    run.stdin.end();

    run.on("close", (code) => {
      clearTimeout(timer);
      let correct = false;

      if (code === 0 && expected_output) {
        correct = result.trim() === expected_output.trim();
      } else if (code === null) {
        result = `Timeout exceeded (${timeoutMs}ms)`;
      } else {
        result = `Runtime error (exit code ${code})\n${errorOutput}`;
      }

      resolve({ input, expected_output, result, correct, timeout: timeoutSec });
    });
  });
}

// -----------------------------------
// Process a single job
// -----------------------------------
async function processJob(ques_name, code, language, testcases) {
  const extension = language === "cpp" ? "cpp" : language === "java" ? "java" : "py";
  const fileName = `${ques_name}_${WORKER_FIELD}_${Date.now()}.${extension}`;
  const filePath = path.join(__dirname, fileName);

  const execPath =
    language === "java" ? __dirname : filePath.replace(/\.\w+$/, language === "cpp" ? ".exe" : ".py");

  // Write user code to file
  fs.writeFileSync(filePath, code);

  try {
    // Compile code (if needed)
    await compileCode(language, filePath, execPath);

    // Run all test cases in parallel
    const results = await Promise.all(
      testcases.map((tc) =>
        runTestcase(language, execPath, tc.input, tc.expected_output, tc.timeout, ques_name)
      )
    );

    // Store results for this worker in Redis
    await redis_server.setEx(
      `job:${ques_name}:worker:${WORKER_FIELD}`,
      30,
      JSON.stringify(results)
    );

    // Mark this worker as completed
    await redis_server.hSet(`job:${ques_name}:status`, {
      [WORKER_FIELD]: "completed",
    });
    await redis_server.expire(`job:${ques_name}:status`, 30);

    console.log(`Completed job ${ques_name} by ${WORKER_FIELD}`);
  } catch (err) {
    console.error("Error during job processing:", err);

    // Store error for this worker
    await redis_server.setEx(
      `job:${ques_name}:worker:${WORKER_FIELD}`,
      30,
      JSON.stringify([{ error: err.toString() }])
    );

    await redis_server.hSet(`job:${ques_name}:status`, {
      [WORKER_FIELD]: "completed",
    });
  } finally {
    // Cleanup files
    try {
      fs.unlinkSync(filePath);
    } catch {}
    try {
      if (language === "cpp") fs.unlinkSync(execPath);
      if (language === "java") fs.unlinkSync(filePath.replace(".java", ".class"));
    } catch {}
  }
}

// -----------------------------------
// Polling loop to get jobs
// -----------------------------------
async function pollForJobs() {
  while (true) {
    try {
      const { element: ques_name } = await redis_server.brPop("job_queue", 0);
      console.log(`Got job: ${ques_name} by ${WORKER_FIELD}`);
      console.log("Resolved Worker ID at startup:", WORKER_FIELD)
      // Fetch job details
      const code = await redis_server.hGet(ques_name, "code");
      const language = await redis_server.hGet(ques_name, "language");
      const data_testcases = await redis_server.hGet(ques_name, "testcases");

      if (!data_testcases) {
        console.warn(`No testcases found for job ${ques_name}`);
        continue;
      }

      const testcases = JSON.parse(data_testcases);

      // Process all testcases for this job at once
      await processJob(ques_name, code, language, testcases);
    } catch (err) {
      console.error("Error while polling job:", err);
    }
  }
}

pollForJobs();

// -----------------------------------
// Health check endpoint
// -----------------------------------
app.get("/ping", (req, res) => {
  console.log("Ping received at", new Date().toISOString());
  res.send(`Worker ${WORKER_FIELD} is awake`);
});

app.listen(port, () => {
  console.log(`${WORKER_FIELD} running at port ${port}`);
});
