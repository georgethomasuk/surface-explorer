class InstructionInvalidError extends Error {}

const ORIENTATIONS = {
  N: ([x, y]) => [x, y + 1],
  E: ([x, y]) => [x + 1, y],
  S: ([x, y]) => [x, y - 1],
  W: ([x, y]) => [x - 1, y],
};

const ORIENTATION_LOOP = [ORIENTATIONS.N, ORIENTATIONS.E, ORIENTATIONS.S, ORIENTATIONS.W];
const ORIENTATIONS_COUNT = ORIENTATION_LOOP.length;

/**
 * Generate an intial state for the robot based on input params
 * @param  {number[]} position 		    initial coordinates of the robot
 * @param  {string}   orientation     initial orientation of the robot (N,E,S,W)
 * @return {Object}					          a robot state object
 */
function createRobotState({ position, orientation }) {
  const currentOrientation = ORIENTATIONS[orientation];

  if (!currentOrientation) {
    throw new InstructionInvalidError(`Initial orientation is not valid: "${orientation}"`);
  }

  return {
    position,
    forwardMovement: currentOrientation,
  };
}

/**
 * Update the state of the robot to fulfill a rotation instruction
 * @param  {Object} robotState
 * @param  {String} instruction     a rotation instruction in the form "L" or "R"
 * @return {Object}                 a robot state object
 */
function rotateRobot({ robotState, instruction }) {
  const currentOrientationIndex = ORIENTATION_LOOP.indexOf(robotState.forwardMovement);
  let rotationDirection;

  if (instruction === 'L') {
    rotationDirection = -1;
  } else if (instruction === 'R') {
    rotationDirection = 1;
  } else {
    throw new InstructionInvalidError(`Invalid rotation command provided: "${instruction}"`);
  }

  const newOrientationIndex = (currentOrientationIndex + ORIENTATIONS_COUNT + rotationDirection) % ORIENTATIONS_COUNT;

  return {
    position: [robotState.position[0], robotState.position[1]],
    forwardMovement: ORIENTATION_LOOP[newOrientationIndex],
  };
}

/**
 * Move the robot forward along in reponse to a "Forward" instruction
 * @param  {Object} robotState
 * @return {Object}                 a robot state object
 */
function moveRobot({ robotState }) {
  return {
    position: robotState.forwardMovement(robotState.position),
    forwardMovement: robotState.forwardMovement,
  };
}


module.exports = {
  createRobotState,
  rotateRobot,
  moveRobot,
  InstructionInvalidError,
  ORIENTATIONS
};
