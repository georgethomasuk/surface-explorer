const test = require('ava');
const { rotateRobot, ORIENTATIONS, InstructionInvalidError } = require('../../src/robot');

const RIGHT = 'R';
const LEFT = 'L';

function verifyRotation(t, { initial, direction, expected }) {
  const robotState = {
    forwardMovement: initial,
    position: [0,0]
  };

  const finalRobotState = rotateRobot({ robotState, instruction: direction });

  t.is(finalRobotState.forwardMovement, expected);
}

test('A robot facing North that is told to rotate right, will then be facing East', (t) => {
  verifyRotation(t, { initial: ORIENTATIONS.N, direction: RIGHT, expected: ORIENTATIONS.E });
});

test('A robot facing North that is told to rotate left, will then be facing West', (t) => {
  verifyRotation(t, { initial: ORIENTATIONS.N, direction: LEFT, expected: ORIENTATIONS.W });
});

test('A robot facing West that is told to rotate right, will then be facing North', (t) => {
  verifyRotation(t, { initial: ORIENTATIONS.W, direction: RIGHT, expected: ORIENTATIONS.N });
});

test('A robot facing West that is told to rotate left, will then be facing South', (t) => {
  verifyRotation(t, { initial: ORIENTATIONS.W, direction: LEFT, expected: ORIENTATIONS.S });
});

test('Throws an error when an invalid instruction is provided', (t) => {
  const robotState = {
    forwardMovement: ORIENTATIONS.N,
  };

  t.throws(() => rotateRobot({ robotState, instruction: 'U' }), InstructionInvalidError);
});
