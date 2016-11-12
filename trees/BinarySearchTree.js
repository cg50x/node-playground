/*
	BinarySearchTree

	insert(value)
	has(value)
	size()
	remove(value)
*/
const TreeNode = require('./TreeNode');

class BinarySearchTree {
	constructor() {
		this._root = null;
	}
	// O(logN)
	insert(newValue) {
		// create a new node
		let newNode = new TreeNode({
			value: newValue,
			left: null,
			right: null
		});
		// if nothing in the binary search tree
		// set root to the new node
		if (this._root === null) {
			this._root = newNode;
			return;
		}

		// Find the potential parent node and
		// add the new node
		let parentNode = this._root;
		let hasBeenInserted = false;
		while (!hasBeenInserted) {
			let parentValue = parentNode.value;
			if (newValue < parentValue) {
				if (parentNode.left === null) {
					parentNode.left = newNode;
					hasBeenInserted = true;
				} else {
					parentNode = parentNode.left;
				}
			} else {
				if (parentNode.right === null) {
					parentNode.right = newNode;
					hasBeenInserted = true;
				} else {
					parentNode = parentNode.right;
				}
			}
		}
	}
	has(targetValue) {
		// if nothing in the tree, return false
		if (this._root === null) {
			return false;
		}
		// set curr node to the root
		let currNode = this._root;

		// while curr node is not null
		// if curr value === targetvalue, return true
		// if curr value < targetvalue, set curr node to left
		// else set curr node to right child
		while (currNode !== null) {
			if (currNode.value === targetValue) {
				return true;
			} else if (targetValue < currNode.value) {
				currNode = currNode.left;
			} else {
				currNode = currNode.right;
			}
		}
		return false;
	}
	size() {
		return this.sizeIterativeHelper();
	}
	sizeIterativeHelper() {
		let nodeArray = [];
		let resultSize = 0;
		if (this._root !== null) {
			nodeArray.push(this._root);
		}
		while (nodeArray.length > 0) {
			resultSize += 1;
			// get the first element
			let currNode = nodeArray[0];
			if (currNode.left !== null) {
				nodeArray.push(currNode.left);
			}
			if (currNode.right !== null) {
				nodeArray.push(currNode.right);
			}
			// Remove the first element
			nodeArray.shift();
		}
		return resultSize;
	}
	sizeRecursiveHelper(currNode) {
		if (currNode === null) {
			return 0;
		}
		let resultCount = 1;
		resultCount += this.sizeRecursiveHelper(currNode.left);
		resultCount += this.sizeRecursiveHelper(currNode.right);
		return resultCount;
	}
}

module.exports = BinarySearchTree;