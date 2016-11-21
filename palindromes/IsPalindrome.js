/*
	Write a function that takes a string and returns whether or not it's a palindrome.
 */

function isPalindrome(inputString) {
	let middleIndex = Math.floor(inputString.length / 2);
	let lastIndex = inputString.length - 1;
	for (let currIndex = 0; currIndex < middleIndex; currIndex += 1) {
		let currChar = inputString.charAt(currIndex);
		let otherChar = inputString.charAt(lastIndex - currIndex);
		if (currChar !== otherChar) {
			return false;
		}
	}
	return true;
}

let input = 'gohangasalamiimalasagnahog';
let output = isPalindrome(input);
console.log(output);