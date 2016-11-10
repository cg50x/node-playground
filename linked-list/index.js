/*
	Linked List

	A list data structure offers the following methods:
	- get(index)
	- set(index, value)
	- remove(index)
	- size

	A linked list is an implementation of the list data structure that uses a chain of linked nodes.
	Each node contains:
	- a value
	- a reference to the next node in the list
*/

/*
	SinglyListNode Class
*/
class SinglyListNode {
	constructor({value, next}) {
		this.value = value;
		this.next = next;
	}
}

class SinglyLinkedList {
	constructor() {
		this._head = null;
	}
	// Adds value to the end of the list
	// O(N)
	// Could be O(1) if we keep a reference to the tail
	add(value) {
		let newNode = new SinglyListNode({
			value: value,
			next: null
		});
		if (this._head === null) {
			this._head = newNode;
		} else {
			let currNode = this._head;
			while (currNode.next !== null) {
				currNode = currNode.next;
			}
			currNode.next = newNode;
		}
	}
	// Retrieves the value at the given index
	// O(N)
	get(targetIndex) {
		let targetNode = this._getNodeAtIndex(targetIndex);
		if (targetNode === null) {
			return null;
		}
		return targetNode.value;
	}
	// Sets the value at the given index
	// O(N)
	set(targetIndex, value) {
		let targetNode = this._getNodeAtIndex(targetIndex);
		if (targetNode === null) {
			return;
		}
		targetNode.value = value;
	}
	// Removes the item at the given target
	// and returns the value that was removed.
	// O(N)
	remove(targetIndex) {
		let prevNode = this._getNodeAtIndex(targetIndex - 1);
		if (prevNode === null || prevNode.next === null) {
			return null;
		}
		let removedValue = prevNode.next.value;
		prevNode.next = prevNode.next.next;
		return removedValue;
	}
	// Calculates and returns the size of the list.
	// O(N)
	// Could be O(1) if we keep track of size in a variable and update it on every add/remove
	size() {
		let nodeCount = 0;
		let currNode = this._head;
		while (currNode !== null) {
			currNode = currNode.next;
			nodeCount += 1;
		}
		return nodeCount;
	}
	toArray() {
		let resultArray = [];
		let currNode = this._head;
		while (currNode !== null) {
			resultArray.push(currNode.value);
			currNode = currNode.next;
		}
		return resultArray;
	}
	_getNodeAtIndex(targetIndex) {
		let currNode = this._head;
		let currIndex = 0;
		while (currIndex < targetIndex && currNode && currNode.next !== null) {
			currNode = currNode.next;
			currIndex += 1;
		}
		if (currIndex === targetIndex) {
			return currNode;
		}
		return null;
	}
}

let linkedList = new SinglyLinkedList();

console.log('Created the linked list');
console.log('list:', linkedList.toArray());

linkedList.add(0);
linkedList.add(1);
linkedList.add(2);
linkedList.add(3);
linkedList.add(4);
console.log('Added 5 values');
console.log('list:', linkedList.toArray());
console.log(linkedList.size(), '=== 5');
console.log(linkedList.get(4), '=== 4');

linkedList.set(4, 999);
console.log('Set index 4 to 999');
console.log('list:', linkedList.toArray());

linkedList.remove(2);
console.log('Removed item at index 2');
console.log('list:', linkedList.toArray());