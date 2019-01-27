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
      robotState: createRobotState({...initialRobotState, blocked: true})
    }
  }

  const beforeMovePlanetState = depositScent({
    robotState: initialRobotState,
    planetState: initialPlanetState
  });

  const afterMoveRobotState = moveRobot({robotState: initialRobotState});

  const robotInFatalPositionAfterMove = isPositionFatal({
    planetState: initialPlanetState,
    position: afterMoveRobotState.position
  });

  if (robotInFatalPositionAfterMove) {
    return {
      planetState: beforeMovePlanetState,
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

}


function executeInstructionOnRobot({instruction, robotState, planetState}){
  switch(instruction){
  case 'F':
    return moveRobot
    break;
  }
}

function executeRobotMission({ planetState, mission }) {
  const initialRobotState = createRobotState(mission.initial);

  // mission.instructions.reduce()


  // mission.commands.re

  // Create the initial state of the robot
  // Iterate over the commands
  // Deploy scent
  // Move the robot
  // Check if position is off world
  // If off world the declare such and cease commands
  // If on world remove the scent
  // Return the latest planet and robot state

  return {
    planetState,
    robotState: initialRobotState
  }
}

module.exports = {
  executeRobotMission,
  executeMoveInstruction
};
