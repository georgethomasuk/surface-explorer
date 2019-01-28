const test = require('ava');
const { missionScript, missionString } = require('./_modelMission');
const { parseInstructions } = require('../../src/runner');

test('Parses instructions from an input string to a structured mission script', (t) => {
  console.log(missionString);
  const structuredMission = parseInstructions(missionString);

  t.deepEqual(structuredMission, missionScript);
});
