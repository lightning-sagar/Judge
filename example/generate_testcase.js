function generateTestCases(maxCases = 100) {
  const inputs = [];
  const outputs = [];

  for (let i = 1; i <= maxCases; i++) {
    const arr = Array.from({ length: i }, (_, idx) => idx + 1).join(' ');
    const input = `${i} ${arr}`;
    const expectedOutput = ((i * (i + 1)) / 2).toString();

    inputs.push(input);
    outputs.push(expectedOutput);
  }

  return {
    inputStr: inputs.join(' ### '),
    outputStr: outputs.join(' ### ')
  };
}
console.log("Generating test cases...");
const { inputStr, outputStr } = generateTestCases();
console.log(inputStr," \n\n\n\n\n\n\n\n\n", outputStr);