import fs from 'fs';
import path from 'path';
import { judge } from 'lib-judge';
import uuid from 'uid-safe';

// Assuming code is a string of C++ source code
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

const tmpDir = './tmp';
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
const tmpPath = path.join(tmpDir, `code_${Date.now()}.cpp`);
fs.writeFileSync(tmpPath, code, 'utf-8');


const inputs = [];
const outputs = [];

for (let i = 1; i <= 200; i++) {
  const arr = Array.from({length: i}, (_, idx) => idx + 1).join(' ');
  inputs.push(`${i} ${arr}`);
  const sum = (i * (i + 1)) / 2;
  outputs.push(sum.toString());
}

const inputStr = inputs.join(' ### ');
const outputStr = outputs.join(' ### ');
console.log('sum of array' + uuid.sync(5))
const result = await judge({
  codePath: tmpPath,  
  ques_name: 'sum of array' + uuid.sync(5),
  input: inputStr,
  output: outputStr,
  language: 'cpp',
  timeout: '2',
  sizeout: '64',
});

console.log(result);
