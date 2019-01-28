const test = require('ava');
const { executeRobotMission } = require('../../src/operator');

function verifyRobotState({ t }, { finalState, expectedState }) {
  t.deepEqual(finalState.robotState.position, expectedState.robot.position);
  t.is(finalState.robotState.orientation, expectedState.robot.orientation);
  t.is(finalState.robotState.lost, expectedState.robot.lost);
}

test('Should navigate the robot along a route that is all on world', (t) => {
  const initial = {
    position: [1, 1],
    orientation: 'E',
  };

  const instructions = ['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F'];

  const mission = {
    initial,
    instructions,
  };

  const planetState = {
    bounds: [5, 3],
    scents: [],
  };

  const expectedRobotState = {
    position: [1, 1],
    orientation: 'E',
    lost: false,
  };

  const expectedState = {
    robot: {
      position: [1, 1],
      orientation: 'E',
      lost: false,
    },
    planet: planetState,
  };

  const finalState = executeRobotMission({ planetState, mission });

  verifyRobotState({ t }, { finalState, expectedState });
});

test('Should navigate the robot along a route that takes it off world', (t) => {
  const initial = {
    position: [3, 2],
    orientation: 'N',
  };

  const instructions = ['F', 'R', 'R', 'F', 'L', 'L', 'F', 'F', 'R', 'R', 'F', 'L', 'L'];

  const mission = {
    initial,
    instructions,
  };

  const planetState = {
    bounds: [5, 3],
    scents: [],
  };

  const expectedState = {
    robot: {
      position: [3, 3],
      orientation: 'N',
      lost: true,
    },
    planet: {
      bounds: planetState.bounds,
      scents: ['3-3-N'],
    },
  };

  const finalState = executeRobotMission({ planetState, mission });

  verifyRobotState({ t }, { finalState, expectedState });
});

test('Should complete this other mission', (t) => {
  const initial = {
    position: [0, 3],
    orientation: 'W',
  };

  const instructions = ['L', 'L', 'F', 'F', 'F', 'L', 'F', 'L', 'F', 'L'];

  const mission = {
    initial,
    instructions,
  };

  const planetState = {
    bounds: [5, 3],
    scents: ['3-3-N'],
  };

  const expectedState = {
    robot: {
      position: [2, 3],
      orientation: 'S',
      lost: false,
    },
    planet: {
      bounds: planetState.bounds,
      scents: ['3-3-N'],
    },
  };

  const finalState = executeRobotMission({ planetState, mission });

  verifyRobotState({ t }, { finalState, expectedState });
});
