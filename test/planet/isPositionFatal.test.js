const test = require('ava');
const { isPositionFatal } = require('../../src/planet');

const planetState = {
  bounds: [10, 10],
  scents: [],
};

test('Marks any position left of the x axis as fatal', (t) => {
  const position = [-1, 0];
  const isFatal = isPositionFatal({ planetState, position });

  t.is(isFatal, true);
});

test('Marks any position below the y axis as fatal', (t) => {
  const position = [0, -1];
  const isFatal = isPositionFatal({ planetState, position });

  t.is(isFatal, true);
});

test('Marks any position right of the x boundary as fatal', (t) => {
  const position = [11, 10];
  const isFatal = isPositionFatal({ planetState, position });

  t.is(isFatal, true);
});

test('Marks any position above of the y boundary as fatal', (t) => {
  const position = [10, 11];
  const isFatal = isPositionFatal({ planetState, position });

  t.is(isFatal, true);
});

test('Marks any position inside bounds an non fatal', (t) => {
  const position = [10, 10];
  const isFatal = isPositionFatal({ planetState, position });

  t.is(isFatal, false);
});
