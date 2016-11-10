const SinglyLinkedList = require('./SinglyLinkedList');
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