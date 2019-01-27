const test = require('ava');
const { ORIENTATIONS } = require('../../src/robot');

test('Moving North will reposition the robot one grid square north', (t) => {
  const startingPosition = [3, 3];

  const finalPosition = ORIENTATIONS.N(startingPosition);

  t.is(finalPosition[0], 3);
  t.is(finalPosition[1], 4);
});

test('Moving South will reposition the robot one grid square south', (t) => {
  const startingPosition = [3, 3];

  const finalPosition = ORIENTATIONS.S(startingPosition);

  t.is(finalPosition[0], 3);
  t.is(finalPosition[1], 2);
});


test('Moving East will reposition the robot one grid square east', (t) => {
  const startingPosition = [5, 5];

  const finalPosition = ORIENTATIONS.E(startingPosition);

  t.is(finalPosition[0], 6);
  t.is(finalPosition[1], 5);
});


test('Moving West will reposition the robot one grid square west', (t) => {
  const startingPosition = [5, 5];

  const finalPosition = ORIENTATIONS.W(startingPosition);

  t.is(finalPosition[0], 4);
  t.is(finalPosition[1], 5);
});
