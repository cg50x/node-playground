const ArrayMinHeap = require('./ArrayMinHeap');

let heap = new ArrayMinHeap();
heap.insert(100);
heap.insert(5);
heap.insert(25);
heap.insert(9);
heap.insert(35);
heap.insert(8842);
heap.insert(323);
heap.insert(2);
heap.insert(4);
console.log('heap', heap._array);
console.log('toTreeString', heap.toTreeString());