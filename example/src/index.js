import fs from "fs";
import path from "path";
import { judge } from "lib-judge";
import uuid from "uid-safe";

const main = async () => {
  const { inputStr, outputStr } = createTestcase();
  const codePath = getPath();
  console.log("getting started");
  const result = await judge({
    codePath,
    ques_name: "sum_of_array" + uuid.sync(5), // must be unique
    input: inputStr,
    output: outputStr,
    language: "cpp",
    timeout: "2",
    sizeout: "64",
  });   
  console.log("this is ans ",result);
};

main();

function getPath(){
  const code = `
  #include<iostream>
  #include<vector>
  using namespace std;
  int main(){
      int n;
      cin>>n;
      vector<int> v(n);
      for(int i = 0;i<n;i++){
          cin>>v[i];
      }
      int c = 0;
      for(auto it:v){
          c+=it;
      }
      cout<<c;
      return 0;
  }`;

  // code here or upload the file in some dir and then you can fix the path in main function
  const tmpDir = "./tmp";
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
  const tmpPath = path.join(tmpDir, `code_${Date.now()}.cpp`);
  fs.writeFileSync(tmpPath, code, "utf-8");
  return tmpPath;
}

// creating ~200 test case 
function createTestcase() {
  const inputs = [];
  const outputs = [];
  for (let i = 1; i <= 15; i++) {
    const arr = Array.from({ length: i }, (_, idx) => idx + 1).join(" ");
    inputs.push(`${i} ${arr}`);
    const sum = (i * (i + 1)) / 2;
    outputs.push(sum.toString());
  }
  const inputStr = inputs.join(" ### ");
  const outputStr = outputs.join(" ### ");
  return { inputStr, outputStr };
}


