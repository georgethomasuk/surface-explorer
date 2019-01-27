const missionScript = {
	 bounds: [5,3],
	 robotMissions: [
	 	{
	 		initial: {
		    position: [1, 1],
		    orientation: 'E',
		  },
      instructions: ['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F']
	 	},
    {
      initial: {
        position: [3, 2],
        orientation: 'N',
      },
      instructions: ['F', 'R', 'R', 'F', 'L', 'L', 'F', 'F', 'R', 'R', 'F', 'L', 'L']
    },
    {
      initial: {
        position: [0, 3],
        orientation: 'W',
      },
      instructions: ['L', 'L', 'F', 'F', 'F', 'L', 'F', 'L', 'F', 'L']
    }
	 ]
}

module.exports = {
  missionScript
}