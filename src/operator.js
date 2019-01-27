const { InstructionInvalidError } = require('./error');
const { createRobotState, rotateRobot, moveRobot } = require('./robot');
const { isPositionFatal, isMovementBlockedByScent, depositScent, removeScent } = require('./planet');

function executeMoveInstruction({robotState, planetState}){
  const initialRobotState = robotState;
  const initialPlanetState = planetState;

  const blockedByScent = isMovementBlockedByScent({
    robotState: initialRobotState,
    planetState: initialPlanetState
  });

  if (blockedByScent) {
    return {
      planetState: initialPlanetState,
      robotState: initialRobotState
    }
  }

  const afterMoveRobotState = moveRobot({robotState: initialRobotState});

  const robotInFatalPositionAfterMove = isPositionFatal({
    planetState: initialPlanetState,
    position: afterMoveRobotState.position
  });

  if (robotInFatalPositionAfterMove) {
    return {
      planetState: depositScent({
        robotState: initialRobotState,
        planetState: initialPlanetState
      }),
      robotState: createRobotState({...initialRobotState, lost: true})
    } 
  } else {
    return {
      planetState: initialPlanetState,
      robotState: afterMoveRobotState
    }
  }

}

function executeRotateInstruction({instruction, robotState, planetState}){
  return {
    planetState,
    robotState: rotateRobot({robotState, instruction})
  }
}


function executeInstruction({instruction, robotState, planetState}){
  switch(instruction){
  case 'F':
    return executeMoveInstruction({instruction, robotState, planetState});
  case 'L':
  case 'R':
    return executeRotateInstruction({instruction, robotState, planetState});
  default:
    throw new InstructionInvalidError(`Movement instruction is not valid: "${instruction}"`);
  }
}

function executeRobotMission({ planetState, mission }) {
  const initialRobotState = createRobotState(mission.initial);

  const finalState = mission.instructions.reduce((latestState, instruction) => {

    if (latestState.robotState.blocked || latestState.robotState.lost) {
      return latestState;
    } else {
      return executeInstruction({instruction, ...latestState});
    }

  }, {planetState, robotState: initialRobotState});

  return finalState;
}

module.exports = {
  executeRobotMission,
  executeRotateInstruction,
  executeMoveInstruction
};
