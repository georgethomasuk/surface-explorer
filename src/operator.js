const { createRobotState, rotateRobot, moveRobot } = require('./robot');


function executeRobotMission({ planetState, mission }) {
  const initialRobotState = createRobotState(mission.initial);

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
};
