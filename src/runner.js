const { createPlanetState } = require('./planet');
const { executeRobotMission } = require('./operator');

function executeMission(instructions) {
  const initialPlanetState = createPlanetState({ bounds: instructions.bounds });


  const finalState = instructions.robotMissions.reduce((initialState, robotMission) => {
    const latestState = executeRobotMission({
      planetState: initialState.planetState,
      mission: robotMission,
    });

    return {
      planetState: latestState.planetState,
      robots: [...initialState.robots, latestState.robotState],
    };
  }, {
    planetState: initialPlanetState,
    robots: [],
  });

  return finalState;
}

function generateMissionSummary(finalState) {
  return finalState.robots.map(robotState => `${robotState.position[0]} ${robotState.position[1]} ${robotState.orientation}${robotState.lost ? ' LOST' : ''}`);
}

function parseRobotInstructions([initialLine, instructionLine]) {
  const initial = initialLine.split(' ');
  return {
    initial: {
      position: [Number(initial[0]), Number(initial[1])],
      orientation: initial[2],
    },
    instructions: instructionLine.split(''),
  };
}

function parseInstructions(instructionString) {
  const lines = instructionString.split(/\r?\n/).filter(line => line.length > 1);

  const bounds = lines[0].split(' ').map(n => Number(n));

  const missionLines = lines.slice(1).reduce((missions, line) => {
    const lastEntry = missions[missions.length - 1];

    if (lastEntry.length < 2) {
      lastEntry.push(line);
    } else {
      missions.push([line]);
    }

    return missions;
  }, [[]]);

  const robotMissions = missionLines.map(parseRobotInstructions);

  return {
    bounds,
    robotMissions,
  };
}

module.exports = {
  executeMission,
  parseInstructions,
  generateMissionSummary,
};
