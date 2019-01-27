const MOVEMENTS = require('./movements');

class InstructionInvalidError extends Error {}

const COMPASS_POINTS = ['N', 'E', 'S', 'W'];
const COMPASS_POINT_COUNT = COMPASS_POINTS.length;

/**
 * Generate an intial state for the robot based on input params
 * @param  {number[]} position 		    initial coordinates of the robot
 * @param  {string}   orientation     initial orientation of the robot (N,E,S,W)
 * @return {Object}					          a robot state object
 */
function createRobotState({ position, orientation }) {
  if (COMPASS_POINTS.includes(orientation) === false) {
    throw new InstructionInvalidError(`Orientation is not valid: "${orientation}"`);
  }

  return {
    position: [...position],
    orientation: orientation,
  };
}

/**
 * Update the state of the robot to fulfill a rotation instruction
 * @param  {Object} robotState
 * @param  {String} instruction     a rotation instruction in the form "L" or "R"
 * @return {Object}                 a robot state object
 */
function rotateRobot({ robotState, instruction }) {
  const currentOrientationIndex = COMPASS_POINTS.indexOf(robotState.orientation);
  let rotationDirection;

  if (instruction === 'L') {
    rotationDirection = -1;
  } else if (instruction === 'R') {
    rotationDirection = 1;
  } else {
    throw new InstructionInvalidError(`Invalid rotation command provided: "${instruction}"`);
  }

  const newOrientationIndex = (currentOrientationIndex + COMPASS_POINT_COUNT + rotationDirection) % COMPASS_POINT_COUNT;
  const newOrientation = COMPASS_POINTS[newOrientationIndex];


  return createRobotState({...robotState, orientation: newOrientation});
}

/**
 * Move the robot forward along in reponse to a "Forward" instruction
 * @param  {Object} robotState
 * @return {Object}                 a robot state object
 */
function moveRobot({ robotState }) {
  console.log(robotState.orientation);
  const newPosition = MOVEMENTS[robotState.orientation](robotState.position);
  return createRobotState({...robotState, position: newPosition});
}


module.exports = {
  createRobotState,
  rotateRobot,
  moveRobot,
  InstructionInvalidError,
  COMPASS_POINTS
};
