const { createPlanetState } = require('./planet');
const { executeRobotMission } = require('./operator');

/**
 * Complete a complete mission from initialising a planet and operating all required
 * robots over the surface
 * @param  {Object}  instruction
 * @return {Object}                      The final state of the planet and all robots on it
 */
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

/**
 * Produce a string describing the final state of all the robots after a mission
 * @param  {Object}  finalState           The final state of the planet and robots
 * @return {String[]}
 */
function generateMissionSummary(finalState) {
  return finalState.robots.map(robotState => `${robotState.position[0]} ${robotState.position[1]} ${robotState.orientation}${robotState.lost ? ' LOST' : ''}`);
}

/**
 * A basic method to extract the starting position and movement sequences from raw instruction input
 * @param  {String} initialLine
 * @param  {String} instructionLine
 * @return {Object}
 */
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

/**
 * A basic and very brittle method to parse a full set of instructions from their raw input
 * @param  {String}  instructionString
 * @return {Object}
 */
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
