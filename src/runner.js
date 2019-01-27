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

function parseInstructions(instructionString) {

}

module.exports = {
  executeMission,
  parseInstructions,
};
