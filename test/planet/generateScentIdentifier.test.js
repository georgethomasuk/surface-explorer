const test = require('ava');
const { generateScentIdentifier } = require('../../src/planet');

test('Generates a string to identify a scent from a robot position and orientation', (t) => {
  const robotState = {
    position: [3, 7],
    orientation: 'N',
  };

  const scentIdentifier = generateScentIdentifier({ robotState });

  t.is(scentIdentifier, '3-7-N');
});
