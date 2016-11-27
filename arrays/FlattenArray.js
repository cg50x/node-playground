/*
	Flatten an array.

	Test cases:
	[] => []
	[1,2] => [1,2]
	[[1]] => [1]
	[1,[2],[3,[4,5]]] => [1,2,3,4,5]

	Recursive solution
	- init a result array
	- for each element in the array
	- if the element is an array
	-   - recursively call flatten on it
	-   - concat the flattened array to the result array
	- else
	    - push the element into the result array
	- return the result

	Iterative solution
	- Check if there are any arrays
	- while there are arrays
	  - flatten the arrays at the top level
	    - for each element e
	      - if e is an array concatenate it to the result
	      - else push e into the result
	  - check if there are any arrays
	- return result
 */

function flattenArray_recursive(inputArray) {
	let result = [];
	inputArray.forEach((elem) => {
		if (elem instanceof Array) {
			let flattenedArray = flattenArray_recursive(elem);
			result = result.concat(flattenedArray);
		} else {
			result.push(elem);
		}
	});
	return result;
}

function hasArrays(inputArray) {
	return inputArray.some((elem) => elem instanceof Array);
}

function flattenArray_iterative(inputArray) {
	// check if there are any arrays
	while (hasArrays(inputArray)) {
		// flatten arrays at the top level
		inputArray = inputArray.reduce((flattenedArray, currElem) => {
			if (currElem instanceof Array) {
				return flattenedArray.concat(currElem);
			} else {
				flattenedArray.push(currElem);
				return flattenedArray;
			}
		}, []);
	}
	return inputArray;
}

let flattenArray = flattenArray_iterative;

let input = [1, [2], [3, [4, [5]]]];
let output = flattenArray(input);
console.log('output', output);