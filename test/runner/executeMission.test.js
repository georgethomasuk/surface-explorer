const test = require('ava');
const {missionScript} = require('./_modelMission');
const { executeMission } = require('../../src/runner');

test('Executes a complete mission', t => {
	const finalState = executeMission(missionScript);

  const [robot1, robot2, robot3] = finalState.robots;

  t.deepEqual(robot1.position, [1, 1]);
  t.is(robot1.orientation, 'E');
  t.is(robot1.lost, false);

  t.deepEqual(robot2.position, [3, 3]);
  t.is(robot2.orientation, 'N');
  t.is(robot2.lost, true);

  t.deepEqual(robot3.position, [2, 3]);
  t.is(robot3.orientation, 'S');
  t.is(robot3.lost, false);
});