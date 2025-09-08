import fs from 'fs';
import path from 'path';
import { judge } from 'lib-judge';
import uuid from 'uid-safe';

const code = `
data = list(map(int, input().split()))
n = data[0]
v = data[1:]
print(sum(v))
`;

const tmpDir = './tmp';
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

function generateTestcase(i) {
  const arr = Array.from({ length: i }, (_, idx) => idx + 1).join(' ');
  return {
    input: `${i} ${arr}`,
    output: ((i * (i + 1)) / 2).toString(),
  };
}

const tasks = [];

for (let i = 0; i < 9; i++) {
  const tmpPath = path.join(tmpDir, `code_${uuid.sync(5)}_${i}.cpp`);
  fs.writeFileSync(tmpPath, code);

  const testcases = [];
  for (let j = 1; j <= 10; j++) {
    testcases.push(generateTestcase(j));
  }

  const inputStr = testcases.map(tc => tc.input).join(' ### ');
  const outputStr = testcases.map(tc => tc.output).join(' ### ');

  tasks.push(
    judge({
      codePath: tmpPath,
      ques_name: `sum_array_job_${i}`,
      input: inputStr,
      output: outputStr,
      language: 'py',
      timeout: '2',
      sizeout: '64',
    }).then(result => {
      console.log(`Result ${i}:`, result);
    }).catch(err => {
      console.error(`Error ${i}:`, err);
    })
  );
}

await Promise.all(tasks);
console.log("All 10 jobs submitted concurrently.");
