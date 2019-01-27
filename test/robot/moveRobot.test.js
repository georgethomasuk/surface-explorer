const test = require('ava');
const { moveRobot } = require('../../src/robot');

test('Generates a new robot state, applying the movement to the current position', (t) => {
  const expectedNewPosition = [7, 8];

  const initialRobotState = {
    position: [3, 3],
    orientation: 'S',
  };

  const finalRobotState = moveRobot({ robotState: initialRobotState });

  t.deepEqual(finalRobotState.position, [3, 2]);
  t.is(finalRobotState.orientation, initialRobotState.orientation);
});
