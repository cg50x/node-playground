/*
	Given a number, return whether or not the number is a prime number.
 */

// Time complexity: O(sqrt(N)) where N = input number
// Space complexity: O(1)
function isPrimeSquareRoot(inputNumber) {
	// for i to sqrt(inputNumber)
	// test if inputNumber is divisible by i
	// if it is, return false
	// return true
	let limit = Math.sqrt(inputNumber);
	for (let i = 2; i <= limit; i++) {
		if (inputNumber % i === 0) {
			return false;
		}
	}
	return true;
}

// You don't need to keep dividing it by every number less than sqrt of n
// You just need to see if the input number is divisble by a prime number smaller than the input number.

let isPrime = isPrimeSquareRoot;

let input = 8;
let output = isPrime(input);

console.log(output);