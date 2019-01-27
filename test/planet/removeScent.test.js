const test = require('ava');
const { removeScent } = require('../../src/planet');

test('Creates a new planet state with a scent to match the next move of the robot removed', (t) => {
  const planetState = {
    bounds: [30, 30],
    scents: ['3-3-E'],
  };

  const robotState = {
    position: [3, 3],
    orientation: 'E',
  };

  const finalPlanetState = removeScent({ planetState, robotState });

  t.is(finalPlanetState.scents.length, 0);
});
