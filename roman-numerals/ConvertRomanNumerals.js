/*
	Convert a valid roman numeral to a decimal number


 */

// init result to 0
// iterate through roman numeral string backwards
// if currvalue is smaller than previous value,
// - subtract currvalue from the result
// else
// - add currvalue to the result

function getRomanNumeralValue(singleRomanNumeralChar) {
	let valueMap = {
		'I': 1,
		'V': 5,
		'X': 10,
		'L': 50,
		'C': 100,
		'D': 500,
		'M': 1000
	};
	let result = valueMap[singleRomanNumeralChar];
	if (result === undefined) {
		return 0;
	} else {
		return result;
	}
}
function convertRomanNumeral(romanNumeralString) {
	return romanNumeralString
		.split('')
		.map(getRomanNumeralValue)
		.reduceRight((result, currentValue, index, arr) => {
			// If there is a previous value and the current value is smaller than it,
			// then subtract the current value from the result
			if (index < arr.length - 1 && arr[index + 1] > currentValue) {
				return result - currentValue;
			} else {
				return result + currentValue;
			}
		}, 0);
}

let input = 'XIV';
let output = convertRomanNumeral(input);
console.log('input', input);
console.log('output', output);