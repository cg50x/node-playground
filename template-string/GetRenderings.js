/*
	Given a template like '0??1' return all possible renderings where the questions marks
	are replaced with either a 0 or 1.
 */

// Recursive solution
function getRenderingsRecursively(templateString) {
	if (templateString.length === 0) {
		return [''];
	}
	let subRenderings = getRenderings(templateString.substring(1));
	let firstChar = templateString.charAt(0);
	let charsToPrepend = [];
	if (firstChar !== '?') {
		charsToPrepend.push(firstChar);
	} else {
		charsToPrepend = ['0','1'];
	}
	// Join chars to prepend with the other renderings
	let renderingResults = [];
	charsToPrepend.forEach(function (charToPrepend) {
		subRenderings.forEach(function (subRendering) {
			renderingResults.push(charToPrepend + subRendering);
		});
	});
	return renderingResults;
}

// Iterative solution
// O(2^N) Space
function getRenderingsIteratively(templateString) {
	// start from right to left
	let results = [''];

	for (let currIndex = templateString.length - 1; currIndex >= 0; currIndex -= 1) {
		let currChar = templateString.charAt(currIndex);
		// if currchar is non questionmark, prepend char to all strings
		if (currChar !== '?') {
			results = results.map((rendering) => currChar + rendering);
		} else {
			// Make a copy of the results and prepend '1' to the copied results
			let copyResults = results.slice(0).map((rendering) => '1' + rendering);
			// Prepend 0 to original results
			results = results.map((rendering) => '0' + rendering);
			// Concatenate the copy and the results
			results = results.concat(copyResults);
		}
	}
	return results;
}

// "Space saving" solution
// 
// Involves converting the template string into a graph
// and then doing depth first traversal to get the renderings
// Space O(N) where N is the length of the string.

// Convert template string to graph
// 
// Input: '01??'
// Output:
// 0 - 1 - 0 - 0
//       \   x
//         1 - 1
// Version 1 with empty strings in between
// 0 - '' - 1 - '' - 0 - ''
//                 \ 1 /
// graph node:
// - value
// - neighbors
function getTemplateStringGraph(templateString) {
	let templateStringChars = templateString.split('');
	let currentNodeId = 0;
	// map them to arrays of graph nodes
	let templateStringNodes = templateStringChars.map((templateChar) => {
		let result;
		if (templateChar !== '?') {
			result = [{
				id: currentNodeId,
				value: templateChar,
				neighbors: []
			}];
			currentNodeId += 1;
		} else {
			result = [{
				id: currentNodeId,
				value: '0',
				neighbors: []
			},{
				id: currentNodeId + 1,
				value: '1',
				neighbors: []
			}];
			currentNodeId += 2;
		}
		return result;
	});
	// link the graph nodes to each other
	let graphRoot = {
		id: -1,
		value: '',
		neighbors: []
	};
	let templateStringGraph = templateStringNodes.reduce((graphTail, nodeArray) => {
		let newTail = {
			id: currentNodeId,
			value: '',
			neighbors: []
		};
		currentNodeId += 1;
		nodeArray.forEach((node) => {
			node.neighbors = [newTail];
		});
		graphTail.neighbors = nodeArray;
		return newTail;
	}, graphRoot);

	// Return the root of the graph
	return graphRoot;
}

function getRenderings_RecursiveDFS(templateString) {
	// Convert the template string to a graph
	let templateStringGraph = getTemplateStringGraph(templateString);

	// Depth first traversal of the graph
	// add root to stack
	// while stack is not empty
	// - current node = pop the stack
	// - current node's value to currRenderingCharArray
	// - add neighbors to stack
	// - if no neighbors, add currRenderingCharArray
	// 
}

function doDepthFirstTraversalRecursively(rootNode) {
	if (!rootNode) {
		return;
	}
	console.log('visited node - id: ' + rootNode.id + ' , value: ' + rootNode.value);
	rootNode.neighbors.forEach(doDepthFirstTraversalRecursively);
}

function traverseDepthFirstIteratively(rootNode) {
	let nodeStack = [rootNode];
	while (nodeStack.length > 0) {
		let currNode = nodeStack.pop();
		console.log('visited node - id: ' + currNode.id + ' , value: ' + currNode.value);
		nodeStack = nodeStack.concat(currNode.neighbors);
	}
}

let getRenderings = getRenderingsIteratively;

let input = '?';
// let output = getRenderings(input);
// let output = getTemplateStringGraph(input);
// console.log(JSON.stringify(output));
let graph = getTemplateStringGraph(input);
console.log('Recursive:');
doDepthFirstTraversalRecursively(graph);

console.log('Iterative:');
traverseDepthFirstIteratively(graph);
