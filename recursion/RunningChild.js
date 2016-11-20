/*
	A child is running up a staircase with n steps, and can hop either 1 step, 2 steps, or 3 steps at a time.
	Implement a method to count how many possible ways the child can run up the stairs.
 */

/*
	n steps => # of ways

	0 or less steps => 1 way

	1 step => 1 way (1)

	2 step => 2 ways (1,1), (2)
		- take one step the first time => 1 + f(n-1)
		- take two steps the first time => 1 + f(n-2)
	3 step => 4 ways (1,1,1), (1,2), (2, 1), (3)
		- take one step the first time => 1 + f(n-1)
		- take two steps the first time => 1 + f(n-2)
		- take three steps the first time => 1 + f(n-3)
	4 step => 
		- f(3) + f(2) + f(1)
		- 4 + 2 + 1
		- (1,1,1,1), (1,1,2), (1,2,1), (1,3)
		- (2,1,1), (2,2)
		- (3,1)
 */

// Recursive solution
// O(3^N) makes three calls each time
// What is the space complexity of a recursive call? does the call stack count? it probably should.
// If numSteps === 35, this takes 8.141 seconds
function getPossibleWaysRecursively(numSteps) {
	if (numSteps <= 1) {
		return 1;
	} else if (numSteps === 2) {
		return getPossibleWaysRecursively(numSteps - 1) + getPossibleWaysRecursively(numSteps - 2);
	} else {
		return getPossibleWaysRecursively(numSteps - 1)
			+ getPossibleWaysRecursively(numSteps - 2)
			+ getPossibleWaysRecursively(numSteps - 3);
	}
}

// Recursive solution with memoization
// Does take up space though O(N)
// key = number of steps
// value = number of ways
// If numSteps === 35, this takes .071 seconds
let MEMO = {};
function getPossibleWaysMemoized(numSteps) {
	if (typeof MEMO[numSteps] === 'number') {
		return MEMO[numSteps];
	}
	let result;
	if (numSteps <= 1) {
		result = 1;
	} else if (numSteps === 2) {
		result = getPossibleWaysMemoized(numSteps - 1) + getPossibleWaysMemoized(numSteps - 2);
	} else {
		result = getPossibleWaysMemoized(numSteps - 1)
			+ getPossibleWaysMemoized(numSteps - 2)
			+ getPossibleWaysMemoized(numSteps - 3);
	}
	MEMO[numSteps] = result;
	return result;
}

// Iterative solution
// keep a queue of length 3
// [0,1,2]
// 1,2,3
// Time complexity: O(N)
// Space complexity: O(1)
function getPossibleWaysIterative(numSteps) {
	// base cases
	if (numSteps <= 1) {
		return 1;
	} else if (numSteps === 2) {
		return 2;
	} else if (numSteps === 3) {
		return 4;
	}

	let previousThreeResults = [1,2,4];
	let result;
	while (numSteps > 3) {
		// Result is set to the sum of all values
		result = previousThreeResults.reduce((sum, x) => sum + x);
		// Push the new result into the values while
		// dequeueing the next value
		previousThreeResults.shift();
		previousThreeResults.push(result);
		// decrement numsteps
		numSteps -= 1;
	}
	return result;
}

let getPossibleWays = getPossibleWaysIterative;

let input = 35;
let output = getPossibleWays(input);
console.log('output:', output);