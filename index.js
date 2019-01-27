const fs = require('fs');
const util = require('util');
const { executeMission, parseInstructions, generateMissionSummary } = require('./src/runner');
  
const readFile = util.promisify(fs.readFile);


async function run() {
	const instructionFile = await readFile('./instructions.txt');

	const mission = parseInstructions(instructionFile.toString());

	const finalState = executeMission(mission);

	const summary = generateMissionSummary(finalState);

	summary.forEach(robotSummary => {
		console.log(robotSummary);
	})
}

run();