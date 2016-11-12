/*
	Implement an algorithm to find the kth to last element of a singly linked list.
*/
const SinglyLinkedList = require('./SinglyLinkedList');

// Will k be greater than the length of the list?
// If k is greater than the list, return null
function findKthToLastElement(headNode, k) {
	// Set runner node to the kth element from the beginning
	let runnerNode = headNode;
	for (let i = 0; i < k && runnerNode !== null; i++) {
		runnerNode = runnerNode.next;
	}
	// If runner node is null, return null
	if (runnerNode === null) {
		return null;
	}
	let currentNode = headNode;
	while (runnerNode !== null) {
		runnerNode = runnerNode.next;
		currentNode = currentNode.next;
	}
	return currentNode.value;
}

let linkedList = new SinglyLinkedList();
linkedList.add(1);
linkedList.add(2);
linkedList.add(3);
linkedList.add(4);
linkedList.add(5);
linkedList.add(6);
console.log(findKthToLastElement(linkedList._head, 3));