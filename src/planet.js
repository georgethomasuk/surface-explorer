const MOVEMENTS = require('./movements');

/**
 * @param  {Number[]}   bounds    An xy coordinate of the upper right bound of the planet
 * @param  {String[]}   scents    An array of scents deposited on the planet
 * @return {Object}               A planet state object
 */
function createPlanetState({ bounds, scents }) {
  // Throw error if bounds are greater than 50

  return {
    bounds: [bounds[0], bounds[1]],
    scents: [...scents],
  };
}

/**
 * Determine if a position is off world
 * @param  {Object}    planetState
 * @param  {Number[]}  position       An xy coordinate
 * @return {Boolean}
 */
function isPositionFatal({ planetState, position }) {
  const [x, y] = position;

  if (x < 0) {
    return true;
  } if (y < 0) {
    return true;
  } if (x > planetState.bounds[0]) {
    return true;
  } if (y > planetState.bounds[1]) {
    return true;
  }
  return false;
}

/**
 * Generate a string to uniquely identify the next move of a robot
 * @param  {Object}  robotState
 * @return {String}
 */
function generateScentIdentifier({ robotState }) {
  const [x, y] = robotState.position;
  return `${x}-${y}-${robotState.orientation}`;
}

/**
 * Determine if a scent already exists on the planet that will block the move
 * a robot is about to make
 * @param  {Object}  planetState
 * @param  {Object}  robotState
 * @return {Boolean}
 */
function isMovementBlockedByScent({ planetState, robotState }) {
  const scentIdentifier = generateScentIdentifier({ robotState });

  return planetState.scents.includes(scentIdentifier);
}

/**
 * Generate a new planet state with a scent applied for the next move
 * the robot will make
 * @param  {Object}  planetState
 * @param  {Object}  robotState
 * @return {Object}             A new planet state
 */
function depositScent({ planetState, robotState }) {
  const scentIdentifier = generateScentIdentifier({ robotState });

  if (planetState.scents.includes(scentIdentifier)) {
    return planetState;
  }

  const newPlanetState = createPlanetState(planetState);
  newPlanetState.scents.push(scentIdentifier);
  return newPlanetState;
}

/**
 * Generate a new planet state without a scent for the next move
 * the robot will make
 * @param  {Object}  planetState
 * @param  {Object}  robotState
 * @return {Object}             A new planet state
 */
function removeScent({ planetState, robotState }) {
  const scentIdentifier = generateScentIdentifier({ robotState });

  const newPlanetState = createPlanetState(planetState);

  newPlanetState.scents = newPlanetState.scents.filter(scent => scent !== scentIdentifier);
  return newPlanetState;
}


module.exports = {
  generateScentIdentifier,
  isMovementBlockedByScent,
  createPlanetState,
  isPositionFatal,
  depositScent,
  removeScent,
};
