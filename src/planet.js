function createPlanetState(){
	return {
		scents: []
	}
}

function isPositionFatal({planet, position}){
	// Return Boolean to indicate if position of robot is off world
	return false;
}

function depositScent({planet, robot}){
  // Generate a new planet state with a scent applied
}

function removeScent({planet, robot}){
  // Generate a new planet state with a scent removed
}


module.exports = {
  createPlanetState,
  isPositionFatal,
  depositScent,
  removeScent
}