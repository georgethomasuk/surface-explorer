const test = require('ava');
const { depositScent } = require('../../src/planet');

test('Creates a new planet state with a scent to match the next move of the robot', (t) => {
  const planetState = {
    bounds: [30, 30],
    scents: [],
  };

  const robotState = {
    position: [3, 3],
    orientation: 'E',
  };

  const finalPlanetState = depositScent({ planetState, robotState });

  t.is(finalPlanetState.scents.length, 1);
  t.is(finalPlanetState.scents.includes('3-3-E'), true);
});

test('Does not create a duplicate scent entry', (t) => {
  const planetState = {
    bounds: [30, 30],
    scents: [],
  };

  const robotState = {
    position: [3, 3],
    orientation: 'E',
  };

  const secondPlanetState = depositScent({ planetState, robotState });
  const finalPlanetState = depositScent({ planetState: secondPlanetState, robotState });

  t.is(finalPlanetState.scents.length, 1);
  t.is(finalPlanetState.scents.includes('3-3-E'), true);
});
