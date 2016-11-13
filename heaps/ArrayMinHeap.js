/*
	Every node in the heap is greater than it's parent

	insert
	peek
	removeTop

	heap array

	0 1 2 3 4 5 6
	0
	1 2
	3 4 5 6
	for every ith node
		left = 2*i + 1
		right = 2*i + 2
	0th node
		left = 2*0 + 1 = 1
		right = 2*0 + 2 = 2
	1st node
		left = 2*1 + 1 = 3
		right = 2*1 + 2 = 4
	2nd node
		left = 2*2 + 1 = 5
		right = 2*2 + 2 = 6
	parent of ith node
		if i is odd
			parent = (i - 1) / 2
		else
			parent = (i - 2) / 2
*/

class ArrayMinHeap {
	constructor() {
		this._array = [];
	}
	insert(newValue) {
		if (this._array.length === 0) {
			this._array.push(newValue);
			return;
		}
		// Add to the end
		this._array.push(newValue);
		// Percolate the value as far up as it can go
		this._percolateUp(this._array.length - 1);
	}
	peekTop() {

	}
	removeTop() {
		// Swap top with last index in the array
		// Remove the last index in the array
		// percolate value down
	}
	toTreeString() {
		// Construct depthArrays
		let depthArrays = this._getDepthArrays(0, 0, []);
		return depthArrays.join('\n');
	}
	_getDepthArrays(currentIndex, currentDepth, depthArrays) {
		if (currentIndex >= this._array.length) {
			return;
		}

		let currentValue = this._array[currentIndex];
		let depthArray = depthArrays[currentDepth] || [];
		depthArray.push(currentValue);
		depthArrays[currentDepth] = depthArray;
		
		let leftChildIndex = this._getIndexOfLeftChild(currentIndex);
		let rightChildIndex = this._getIndexOfRightChild(currentIndex);
		this._getDepthArrays(leftChildIndex, currentDepth + 1, depthArrays);
		this._getDepthArrays(rightChildIndex, currentDepth + 1, depthArrays);
		return depthArrays;
	}
	// Just keep going up!
	_percolateUp(index) {
		let currentIndex = index;
		while (currentIndex !== 0) {
			let currentValue = this._array[currentIndex];
			let parentIndex = this._getIndexOfParent(currentIndex);
			if (parentIndex !== null) {
				let parentValue = this._array[parentIndex];
				if (parentValue > currentValue) {
					// Swap the values
					this._array[currentIndex] = parentValue;
					this._array[parentIndex] = currentValue;
				}
			}
			// Use parent as the new current
			currentIndex = parentIndex;
		}
	}
	_getIndexOfLeftChild(index) {
		return index * 2 + 1;
	}
	_getIndexOfRightChild(index) {
		return index * 2 + 2;
	}
	_getIndexOfParent(index) {
		if (index === 0) {
			return null;
		} else if (index & 1 === 1) {
			return (index - 1) / 2;
		} else {
			return (index - 2) / 2;
		}
	}
}
module.exports = ArrayMinHeap;