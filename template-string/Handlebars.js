/*
	Given a template string like so:

	message = 'Hello, {{ name }}'
	values = { "name": "Chris" }
 */

function evaluateTemplateString(templateString, values) {
	// Initialize result variable
	let result = templateString;
	// For each key in values, modify template string.
	Object.keys(values).forEach(function (variableName) {
		let variableValue = values[variableName];
		if (typeof variableValue !== "undefined") {
			result = result.replace(new RegExp('{{\\s*' + variableName + '\\s*}}'), variableValue);
		}
	});
	return result;
}

let inputTemplate = 'Hello, {{ name }}! Welcome to {{ city    }}!';
let inputValues = {
	'name': 'Chris',
	'city': 'Seattle'
};
let output = evaluateTemplateString(inputTemplate, inputValues);
console.log(output);