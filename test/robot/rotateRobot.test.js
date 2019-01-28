const test = require('ava');
const { rotateRobot, InstructionInvalidError } = require('../../src/robot');

const RIGHT = 'R';
const LEFT = 'L';

function verifyRotation(t, { initial, direction, expected }) {
  const robotState = {
    orientation: initial,
    position: [0, 0],
  };

  const finalRobotState = rotateRobot({ robotState, instruction: direction });

  t.is(finalRobotState.orientation, expected);
}

test('A robot facing North that is told to rotate right, will then be facing East', (t) => {
  verifyRotation(t, { initial: 'N', direction: RIGHT, expected: 'E' });
});

test('A robot facing North that is told to rotate left, will then be facing West', (t) => {
  verifyRotation(t, { initial: 'N', direction: LEFT, expected: 'W' });
});

test('A robot facing West that is told to rotate right, will then be facing North', (t) => {
  verifyRotation(t, { initial: 'W', direction: RIGHT, expected: 'N' });
});

test('A robot facing West that is told to rotate left, will then be facing South', (t) => {
  verifyRotation(t, { initial: 'W', direction: LEFT, expected: 'S' });
});

test('Throws an error when an invalid instruction is provided', (t) => {
  const robotState = {
    orientation: 'N',
  };

  t.throws(() => rotateRobot({ robotState, instruction: 'U' }), InstructionInvalidError);
});
