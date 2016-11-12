const BinarySearchTree = require('./BinarySearchTree');

let bst = new BinarySearchTree();

bst.insert(1);
bst.insert(2);
bst.insert(3);
console.log('Size:', bst.size());
console.log(bst.has(1));
console.log(bst.has(2));
console.log(bst.has(3));
console.log(bst.has(4));
console.log(bst.has(5));
