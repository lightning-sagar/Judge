import express from "express";
import fs from "fs";
import path from "path";
import { exec, spawn } from "child_process";
import { fileURLToPath } from "url";
import "dotenv/config";
import { connectredis } from "./redis/redis.js";
import cors from "cors";
import { error } from "console";

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
const port = process.env.PORT;
const redis_server = await connectredis();

async function compileCode(language, codePath, execPath) {
  if (language === "cpp") {
    return new Promise((resolve, reject) => {
      console.log("checks: ",codePath,execPath,language)
      exec(
        `g++ "${codePath}" -o "${execPath}"`,
        { timeout: 10000 },
        (err, _, stderr) => {
          if (err) return reject("C++ Compilation Error:\n" + stderr || error.message);
          resolve();
        }
      );
    });
  } else if (language === "java") {
    return new Promise((resolve, reject) => {
      exec(`javac "${codePath}"`, { timeout: 10000 }, (err, _, stderr) => {
        if (err) return reject("Java Compilation Error:\n" + stderr);
        resolve();
      });
    });
  }
  return Promise.resolve();
}

function runTestcase(
  language,
  execPath,
  input,
  expected_output,
  timeoutSec,
  ques_name
) {
  return new Promise((resolve) => {
    // if (timeoutSec > 2.5) timeoutSec = 2.5;
    const timeoutMs = timeoutSec * 1000;

    let run;
    try {
      if (language === "cpp") {
        run = spawn(execPath, [], { stdio: ["pipe", "pipe", "pipe"] });
      } else if (language === "java") {
        run = spawn("java", ["Main"], {
          cwd: execPath,
          stdio: ["pipe", "pipe", "pipe"],
        });
      } else if (language === "python" || language === "py") {
        const pythonCmd = process.platform === "win32" ? "python" : "python3";
        run = spawn(pythonCmd, [execPath], {
          stdio: ["pipe", "pipe", "pipe"],
        });
      } else {
        return resolve({
          ques_name,
          input,
          expected_output,
          result: `Unsupported language: ${language}`,
          correct: false,
        });
      }
    } catch (err) {
      return resolve({
        ques_name,
        input,
        expected_output,
        result: `Failed to spawn process for ${language}: ${err.message}`,
        correct: false,
      });
    }

    if (!run || !run.stdout) {
      return resolve({
        input,
        expected_output,
        result: `Failed to execute process for ${language}`,
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
      console.log(expected_output);
      console.log(code, expected_output, result.trim());
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

async function processJob(ques_name, code, language, testcases) {
  const extension =
    language === "cpp" ? "cpp" : language === "java" ? "java" : "py";
  const fileName = `${ques_name}.${extension}`;
  const filePath = path.join(__dirname, fileName);
  const execPath =
    language === "java"
      ? __dirname
      : filePath.replace(/\.\w+$/, language === "cpp" ? ".exe" : ".py");

  fs.writeFileSync(filePath, code);

  try {
    await compileCode(language, filePath, execPath);

    const results = await Promise.all(
      testcases.map((tc) =>
        runTestcase(
          language,
          execPath,
          tc.input,
          tc.expected_output,
          tc.timeout,
          ques_name
        )
      )
    );
    console.log(results, "this is results");

    // ✅ Added log before pushing result to Redis
    console.log(`[Redis Push] 🟢 Storing job:${ques_name}:result`);

    await redis_server.setEx(
      `job:${ques_name}:result`,
      300,
      JSON.stringify(results)
    );
    console.log(`[Redis Push] ✅ Result stored successfully`);

    console.log(`[Redis Push] 🟢 Updating job:${ques_name}:status -> completed`);
    await redis_server.hSet(`job:${ques_name}:status`, { state: "completed" });
    await redis_server.expire(`job:${ques_name}:status`, 300);
    console.log(`[Redis Push] ✅ Status updated successfully`);

  } catch (err) {
    console.error("Error during job processing:", err);

    console.log(`[Redis Push] 🔴 Storing failed state for job:${ques_name}`);
    await redis_server.setEx(
      `job:${ques_name}:result`,
      30,
      JSON.stringify([{ error: err.toString() }])
    );
    await redis_server.hSet(`job:${ques_name}:status`, { state: "failed" });
    console.log(`[Redis Push] ❌ Failure recorded in Redis`);
  } finally {
    try {
      fs.unlinkSync(filePath);
    } catch {}
    try {
      if (language === "cpp") fs.unlinkSync(execPath);
      if (language === "java")
        fs.unlinkSync(filePath.replace(".java", ".class"));
    } catch {}
  }
}

async function pollForJobs() {
  while (true) {
    try {
      // Wait for a batch job name from Redis queue
      const result = await redis_server.brPop("job_queue", 0);

      if (!result) {
        console.warn("[Worker] BRPOP returned empty, waiting...");
        continue;
      }

      const batchName = result.element;
      const ques_name = batchName.split("_batch_")[0];
      console.log(`[Worker] 🧩 Got job batch: ${batchName}`);

      // Fetch code & language from Redis
      const code = await redis_server.hGet(ques_name, "code");
      const language = await redis_server.hGet(ques_name, "language");

      if (!code || !language) {
        console.error(`[Worker] ❌ Missing code or language for ${ques_name}`);
        continue;
      }

      // Fetch testcases for this batch
      const batchData = await redis_server.lPop(`testcase_queue:${batchName}`);
      if (!batchData) {
        console.warn(`[Worker] ⚠️ No testcases found for batch ${batchName}`);
        continue;
      }

      let testcases;
      try {
        testcases = JSON.parse(batchData);
      } catch (err) {
        console.error(`[Worker] ❌ JSON parse error for ${batchName}:`, err);
        continue;
      }

      console.log(
        `[Worker] 🧠 Processing ${testcases.length} testcases for ${ques_name}...`
      );

      // Run batch
      await processJob(ques_name, code, language, testcases);

      console.log(`[Worker] ✅ Completed batch for ${ques_name}`);

      // ⚠️ Don't increment completedBatches here
      // It's already handled safely inside processJob()

    } catch (err) {
      console.error("[Worker] 💥 Error while polling job:", err);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // avoid busy loop
    }
  }
}
pollForJobs();

app.get("/ping", (req, res) => {
  console.log("Ping received at", new Date().toISOString());
  res.send("Worker is awake");
});

app.listen(port, () => {
  console.log(`running at port ${port}`);
});
