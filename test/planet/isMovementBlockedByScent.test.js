const test = require('ava');
const { isMovementBlockedByScent } = require('../../src/planet');

const planetState = {
  scents: ['3-3-E'],
};

test('Reports route as blocked if scent exists that matches the next move of the robot', (t) => {
  const robotState = {
    position: [3, 3],
    orientation: 'E',
  };

  const isBlocked = isMovementBlockedByScent({ planetState, robotState });

  t.is(isBlocked, true);
});

test('Reports route as clear if scent does not exists that matches the next move of the robot', (t) => {
  const robotState = {
    position: [3, 2],
    orientation: 'E',
  };

  const isBlocked = isMovementBlockedByScent({ planetState, robotState });

  t.is(isBlocked, false);
});
