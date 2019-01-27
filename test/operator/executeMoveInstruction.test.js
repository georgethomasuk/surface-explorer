const test = require('ava');
const { executeMoveInstruction } = require('../../src/operator');

test('When a move is being made that will be blocked by a scent the robot does not move', t => {

	const initialState = {
		robotState: {
			position: [3,3],
			orientation: 'N',
			lost: false
		},
		planetState: {
			bounds: [3,3],
			scents: ['3-3-N']
		}
	}

	const finalState = executeMoveInstruction(initialState);

	// The robot position will not chnage
	t.deepEqual(finalState.robotState.position, initialState.robotState.position);
	t.is(finalState.robotState.orientation, initialState.robotState.orientation);
	t.is(finalState.robotState.lost, false);
});

test('When a move is being made that takes the robot off world, it is lost and leaves a scent', t => {
	const initialState = {
		robotState: {
			position: [3,3],
			orientation: 'N',
			lost: false
		},
		planetState: {
			bounds: [3,3],
			scents: []
		}
	}

	const finalState = executeMoveInstruction(initialState);

	// The robot position will not chnage
	t.deepEqual(finalState.robotState.position, initialState.robotState.position);
	t.is(finalState.robotState.orientation, initialState.robotState.orientation);

	// The robot state will indicate that it is lost
	t.is(finalState.robotState.lost, true);

	// A scent will be registered on the planet at the position and orientation of the robot
	t.deepEqual(finalState.planetState.scents, ['3-3-N']);
});

test('When a move is being made that remains on world, it moves', t => {
	// The robot position will change
	// There will be no scent registered on the planet
	const initialState = {
		robotState: {
			position: [3,3],
			orientation: 'N',
			lost: false
		},
		planetState: {
			bounds: [3,4],
			scents: []
		}
	}

	const finalState = executeMoveInstruction(initialState);

	// The robot position will change
	t.deepEqual(finalState.robotState.position, [3,4]);
	t.is(finalState.robotState.orientation, initialState.robotState.orientation);

	// The robot state will indicate that not lost
	t.is(finalState.robotState.lost, false);

	// No new scents will have been registered on the world
	t.is(finalState.planetState.scents.length, 0);
});