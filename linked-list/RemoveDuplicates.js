/*
	Problem:

	Write code to remove duplicates from a linked list.

	FOLLOW UP

	How would you solve this problem if a temporary buffer is not allowed.
*/
const SinglyLinkedList = require('./SinglyLinkedList');

// Remove the singly linked list by keeping a map of values that have been seen
// Time: O(N)
// Space: O(d) where d is the number of unique values
function removeDuplicates(rootNode) {
	// Initialize a map between values and the frequency of those values
	let valuesSeen = {};

	// Start at the root node
	let currNode = rootNode;
	while (currNode !== null) {
		// Add current node's value to frequency map
		let currValue = currNode.value;
		valuesSeen[currValue] = true;

		// while the next node's value has been seen before, remove it
		let nextNodeValue = currNode.next && currNode.next.value;
		while (valuesSeen[nextNodeValue]) {
			currNode.next = currNode.next.next;
			nextNodeValue = currNode.next && currNode.next.value;
		}
		// Then go to the next node
		currNode = currNode.next;
	}
}

let linkedList = new SinglyLinkedList();
linkedList.add(1);
linkedList.add(2);
linkedList.add(3);
linkedList.add(2);
linkedList.add(1);
linkedList.add(1);
console.log('Before remove duplicates:', linkedList.toArray());
removeDuplicates(linkedList._head);
console.log('After remove duplicates:', linkedList.toArray());