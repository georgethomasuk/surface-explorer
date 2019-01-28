const { InstructionInvalidError } = require('./error');
const { createRobotState, rotateRobot, moveRobot } = require('./robot');
const {
  isPositionFatal, isMovementBlockedByScent, depositScent, removeScent,
} = require('./planet');

/**
 * Complete an instruction for the robot to move forward one grid square
 * over the planet
 * @param  {Object}  robotState
 * @param  {Object}  planetState
 * @return {Object}                 The robot and planet state after the movec
 */
function executeMoveInstruction({ robotState, planetState }) {
  const initialRobotState = robotState;
  const initialPlanetState = planetState;

  const blockedByScent = isMovementBlockedByScent({
    robotState: initialRobotState,
    planetState: initialPlanetState,
  });

  // The robot cannot complete this instruction, so it will remain in place
  // and await the next instruction
  if (blockedByScent) {
    return {
      planetState: initialPlanetState,
      robotState: initialRobotState,
    };
  }

  const afterMoveRobotState = moveRobot({ robotState: initialRobotState });

  const robotInFatalPositionAfterMove = isPositionFatal({
    planetState: initialPlanetState,
    position: afterMoveRobotState.position,
  });

  // The robot has moved to a position off world, so the planet will have a new
  // scent applied and the robot will now be lost
  if (robotInFatalPositionAfterMove) {
    return {
      planetState: depositScent({
        robotState: initialRobotState,
        planetState: initialPlanetState,
      }),
      robotState: createRobotState({ ...initialRobotState, lost: true }),
    };
  }
  
  // The robot was able to complete the move without any issues, so the position
  // of the robot is updated
  return {
    planetState: initialPlanetState,
    robotState: afterMoveRobotState,
  };
}

/**
 * Complete an instruction for the robot to rotate
 * @param  {String} instruction     A move instruction of L or R
 * @param  {Object} robotState
 * @param  {Object} planetState
 * @return {Object}                 The robot and planet state after the rotation
 */
function executeRotateInstruction({ instruction, robotState, planetState }) {
  return {
    planetState,
    robotState: rotateRobot({ robotState, instruction }),
  };
}

/**
 * Complete any valid instruction sent to the robot
 * @param  {String} instruction     A move instruction of L or R
 * @param  {Object} robotState
 * @param  {Object} planetState
 * @return {Object}                 The robot and planet state after the instruction
 */
function executeInstruction({ instruction, robotState, planetState }) {
  switch (instruction) {
    case 'F':
      return executeMoveInstruction({ instruction, robotState, planetState });
    case 'L':
    case 'R':
      return executeRotateInstruction({ instruction, robotState, planetState });
    default:
      throw new InstructionInvalidError(`Movement instruction is not valid: "${instruction}"`);
  }
}

/**
 * Complete a complete set of instructions from initialising a robot on the planet
 * and then completing a sequence of instructions
 * @param  {Object} planetState
 * @param  {Object} mission         Initialisation and movement sequence
 * @return {Object}                 The robot and planet state after the mission
 */
function executeRobotMission({ planetState, mission }) {
  const initialRobotState = createRobotState(mission.initial);

  const finalState = mission.instructions.reduce((latestState, instruction) => {
    if (latestState.robotState.lost) {
      return latestState;
    }
    return executeInstruction({ instruction, ...latestState });
  }, { planetState, robotState: initialRobotState });

  return finalState;
}

module.exports = {
  executeRobotMission,
  executeRotateInstruction,
  executeMoveInstruction,
};
