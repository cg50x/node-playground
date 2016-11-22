/*
	Imagine a robot sitting on the upper left corner of an X by Y grid. The robot can
	only move in two directions:
	- right
	- down
	How many possible paths are there for the robot to go from (0, 0) to (X, Y)?

	FOLLOW UP

	Imagine certain spots are "off limits," such that the robot cannot step on them.
	Design an algorithm to find a path for the robot from the top left to the bottom
	right.
 */

// start (0, 0), end (0,1) => 1 path
// start (0, 0), end (1,1) => 3 paths

// Assumes that Positive Y points down and positive X is pointing to the right.
// Input (0, 0, 15, 15) Takes 1.736 seconds
function getNumberOfPaths_Recursive(startX, startY, endX, endY) {
	// base cases
	// if startX === endX or startY === endY return 1 since it's just a straight path
	if (startX === endX || startY === endY) {
		return 1;
	}

	// get the number of paths starting at
	// startX + 1, startY
	// startX, startY + 1
	// add them all together
	let rightNeighborPathsCount = getNumberOfPaths_Recursive(startX + 1, startY, endX, endY);
	let downNeighborPathsCount = getNumberOfPaths_Recursive(startX, startY + 1, endX, endY);
	return rightNeighborPathsCount + downNeighborPathsCount;
}

// Iterative version
// - init a count
// - init a stack
// - push the start pos
// - pop the stack
// - if pos's x or y matches the end's x or y, increment the count
// - else get pos's two neighbors and push them to the stack
// TODO: Figure out why my iterative solution takes significantly longer than recursive solution around N = 13
// Input (0, 0, 13, 13) takes 5.047 seconds
function getNumberOfPaths_Iterative(startX, startY, endX, endY) {
	let pathsCount = 0;
	let coordinatesStack = [[startX, startY]];
	while (coordinatesStack.length > 0) {
		let [currX, currY] = coordinatesStack.pop();
		if (currX === endX || currY === endY) {
			pathsCount += 1;
		} else {
			// push the two neighbors into the queue
			coordinatesStack.push([currX + 1, currY]);
			coordinatesStack.push([currX, currY + 1]);
		}
	}
	return pathsCount;
}
/*
	How many times are you going to see the coordinate that matches X and Y?
	e.g. input (0, 0, 1, 1)
	
*/
/*
1 - 1 - 1 - .
|   |   | 
1 - 2 - 3 - .
|   |   |
1 - 3 - 6 - .
|   |   |    
.   .   .   .
*/

/*
  1 - 1
  |    
  1   .
  so two
  
  (2, 2)
  1 - 1 - 1
  |   |
  1 - 2 - 2
  |   |
  1   2   . 
  1 + 2 + 1 + 2 = 6

  (3, 3)
  1 - 1 - 1 - 1
  
  1 - 2 - 3 - 3
  |
  1 - 3 - 6 - 6
  |   |   |
  1   3   6   . (3,3)
  20
  (X + Y)!
  
 */


let getNumberOfPaths = getNumberOfPaths_Recursive;


let input = [0, 0, 3, 3];
let output = getNumberOfPaths(...input);
console.log(output);