/*

	Find the longest common subsequence of digits in two arrays.

	Example input/outputs:
	- [], []
	- [], [1] => []
	- [1], [] => []
	- [1,2,3], [1,3,5] => [1,3]
	- [1,3,5], [2,4,6] => []
	- [1,1,1], [1,1] => [1,1]

	- subsequence doesn't have to be consecutive elements
	- if there are duplicates, they have to be counted
 */

/*
	Naive Solution

	Given array A and B

	let C = all possible subsequences of array A
	for each subsequence D in C
		Check if D is a subsequence of B
		if true, return that subsequence
	return empty array
 */
// [] => [[]]
// [1] => [[], [1]]
// [1,2] => 
// - 1 + getAllSubsequences([2])
// -> 1 + [[], [2]]
// -> [[], [2], [1], [1,2]]
function getAllSubsequences(inputArray) {
	if (inputArray.length === 0) {
		return [[]];
	}
	// Get all subsequences of the subarray
	let subArray = inputArray.slice(1);
	let subArraySubsequences = getAllSubsequences(subArray);
	let result = [];
	let currElem = inputArray[0];
	subArraySubsequences.forEach((subArraySubsequence) => {
		result.push([currElem, ...subArraySubsequence]);
	});
	result = result.concat(subArraySubsequences);
	return result;
}

/*
	init an subsequenceIndex at 0
	for each elem in inputArray
		if subsequenceIndex < inputArray.length && elem === inputSubsequence[subsequenceIndex]
			subsequenceIndex += 1;

	return subsequenceIndex === inputSubsequence.length

	Time: O(N)
 */
function isSubsequence(inputSubsequence, inputArray) {
	let subsequenceIndex = 0;
	inputArray.forEach((inputElem) => {
		if (subsequenceIndex < inputArray.length && inputElem === inputSubsequence[subsequenceIndex]) {
			subsequenceIndex += 1;
		}
	});
	return subsequenceIndex === inputSubsequence.length;
}

function longestCommonSubsequence_Naive(arrayA, arrayB) {
	let subsequences = getAllSubsequences(arrayA);
	// Keep track of the greatest subsequence
	let result = [];
	for (let i = 0; i < subsequences.length; i++) {
		let currSubsequence = subsequences[i];
		if (currSubsequence.length > result.length && isSubsequence(currSubsequence, arrayB)) {
			result = currSubsequence;
		}
	}
	return result;
}


/*
	Recursive solution
	A = [1,2,3,...]
	B = [1,2,3,...]

	Break this up in the longest common subsequence
	LCS(A,B) =>
		LCS_SO_FAR = MAX(
			LCS(A-1, B-1)
			LCS(A-1, B)
			LCS(A, B-1)
		)
		if A === B
			return LCS(A-1, B-1) + A
		else
			return MAX(
				LCS(A-1, B)
				LCS(A, B-1)
			)
 */

function longestCommonSubsequence_Recursive(arrayA, arrayB) {
	// if either are empty, return an empty array
	if (arrayA.length === 0 || arrayB.length === 0) {
		return [];
	}
	// Compare the last elements together
	let lastA = arrayA[arrayA.length - 1];
	let lastB = arrayB[arrayB.length - 1];

	if (lastA === lastB) {
		// Get the LCS of arrayA - 1 and arrayB - 1
		let result = longestCommonSubsequence(arrayA.slice(0, arrayA.length - 1), arrayB.slice(0, arrayB.length - 1));
		// Add the lastA to the LCS received,
		result.push(lastA);
		// return that as the result
		return result;
	} else {
		let lcsWithFullB = longestCommonSubsequence(arrayA.slice(0, arrayA.length - 1), arrayB.slice(0));
		let lcsWithFullA = longestCommonSubsequence(arrayA.slice(0), arrayB.slice(0, arrayB.length - 1));
		if (lcsWithFullB.length > lcsWithFullA.length) {
			return lcsWithFullB;
		} else {
			return lcsWithFullA;
		}
	}
}

function longestCommonSubsequence_RecursiveIndex(arrayA, arrayB) {
	return longestCommonSubsequence_RecursiveIndexHelper(arrayA, arrayB, arrayA.length - 1, arrayB.length - 1);
}

function longestCommonSubsequence_RecursiveIndexHelper(arrayA, arrayB, lastIndexA, lastIndexB) {
	// if either are empty, return an empty array
	if (lastIndexA < 0 || lastIndexB < 0) {
		return [];
	}
	// Compare the last elements together
	let lastA = arrayA[lastIndexA];
	let lastB = arrayB[lastIndexB];

	if (lastA === lastB) {
		// Get the LCS of arrayA - 1 and arrayB - 1
		let result = longestCommonSubsequence_RecursiveIndexHelper(arrayA, arrayB, lastIndexA - 1, lastIndexB - 1);
		// Add the lastA to the LCS received,
		result.push(lastA);
		// return that as the result
		return result;
	} else {
		let lcsWithFullB = longestCommonSubsequence_RecursiveIndexHelper(arrayA, arrayB, lastIndexA - 1, lastIndexB);
		let lcsWithFullA = longestCommonSubsequence_RecursiveIndexHelper(arrayA, arrayB, lastIndexA, lastIndexB - 1);
		if (lcsWithFullB.length > lcsWithFullA.length) {
			return lcsWithFullB;
		} else {
			return lcsWithFullA;
		}
	}
}

function longestCommonSubsequence_RecursiveMemoized(arrayA, arrayB) {
	// initialize 2d array for memoization
	let numRows = arrayA.length;
	let numCols = arrayB.length;
	let memoArray = new Array(numRows).fill().map(() => new Array(numCols));
	return longestCommonSubsequence_RecursiveMemoizedHelper(arrayA, arrayB, arrayA.length - 1, arrayB.length - 1, memoArray);
}

function longestCommonSubsequence_RecursiveMemoizedHelper(arrayA, arrayB, lastIndexA, lastIndexB, memoArray) {
	// if either are empty, return an empty array
	if (lastIndexA < 0 || lastIndexB < 0) {
		return [];
	}
	// If we have a result memoized already, return that
	let memoizedResult = memoArray[lastIndexA][lastIndexB];
	if (Array.isArray(memoizedResult)) {
		return memoizedResult;
	}

	// Compare the last elements together
	let lastA = arrayA[lastIndexA];
	let lastB = arrayB[lastIndexB];

	if (lastA === lastB) {
		// Get the LCS of arrayA - 1 and arrayB - 1
		let result = longestCommonSubsequence_RecursiveMemoizedHelper(arrayA, arrayB, lastIndexA - 1, lastIndexB - 1, memoArray);
		// Add the lastA to the LCS received,
		result = [...result, lastA];
		// Memoize the result
		memoArray[lastIndexA][lastIndexB] = result;
		// return that as the result
		return result;
	} else {
		let lcsWithFullB = longestCommonSubsequence_RecursiveMemoizedHelper(arrayA, arrayB, lastIndexA - 1, lastIndexB, memoArray);
		let lcsWithFullA = longestCommonSubsequence_RecursiveMemoizedHelper(arrayA, arrayB, lastIndexA, lastIndexB - 1, memoArray);
		let result;
		if (lcsWithFullB.length > lcsWithFullA.length) {
			result = lcsWithFullB;
		} else {
			result = lcsWithFullA;
		}
		// Memoize the result
		memoArray[lastIndexA][lastIndexB] = result;
		return result;
	}
}

let longestCommonSubsequence = longestCommonSubsequence_Naive;

let inputArgs = [
	[1,3,3,3,3,3,3,5],
	[1,3,3,3,4,5]
];
// inputArgs = [
// 	[1,2,3,4,5,6],
// 	[6,5,4,3,2,1]
// ];
let output = longestCommonSubsequence.apply(null, inputArgs);
console.log('inputArgs:', inputArgs);
console.log('output:', output);

// let inputArgs = [
// 	[1,3,5],
// 	[1,2,3,4,5,6]
// ];
// let output = isSubsequence.apply(null, inputArgs);
// console.log('inputArgs:', inputArgs);
// console.log('output:', output);

// let inputArgs = [
// 	[1,2]
// ];
// let output = getAllSubsequences.apply(null, inputArgs);
// console.log('inputArgs:', inputArgs);
// console.log('output:', output);