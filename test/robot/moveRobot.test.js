const test = require('ava');
const sinon = require('sinon');
const { moveRobot } = require('../../src/robot');

test('Generates a new robot state, applying the movement to the current position', (t) => {
  const expectedNewPosition = [7, 8];

  const initialRobotState = {
    position: [3, 3],
    forwardMovement: sinon.stub().returns(expectedNewPosition),
  };

  const finalRobotState = moveRobot({ robotState: initialRobotState });

  t.truthy(initialRobotState.forwardMovement.calledWith(initialRobotState.position));
  t.deepEqual(finalRobotState.position, expectedNewPosition);
  t.is(finalRobotState.forwardMovement, initialRobotState.forwardMovement);
});
