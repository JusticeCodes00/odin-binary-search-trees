import Tree from "./classes/Tree.js";

function getRandomArrNum(range = 100) {
    const arr = [];
    for (let i = 0; i <= range; i++) {
        arr.push(Math.floor(Math.random() * range));
    }
    return arr;
}

// DRIVER
const tree = new Tree(getRandomArrNum(10));

console.log(`Tree:`);
tree.prettyPrint();
console.log(`Balanced: ${tree.isBalanced()}`);
console.log(`LevelOrder: `);
tree.levelOrderForEach(console.log);
console.log(`preOrder: `);
tree.preOrderForEach(console.log);
console.log(`inOrder: `);
tree.inOrderForEach(console.log);
console.log(`postOrder: `);
tree.postOrderForEach(console.log);
console.log(`Adding 100, 200, and 300: `);
tree.insert(100);
tree.insert(200);
tree.insert(300);
console.log(`Tree:`);
tree.prettyPrint();
console.log(`Balanced: ${tree.isBalanced()}`);
console.log(`Calling rebalance()`);
tree.rebalance();
console.log(`Tree:`);
tree.prettyPrint();
console.log(`Balanced: ${tree.isBalanced()}`);
console.log(`LevelOrder: `);
tree.levelOrderForEach(console.log);
console.log(`preOrder: `);
tree.preOrderForEach(console.log);
console.log(`inOrder: `);
tree.inOrderForEach(console.log);
console.log(`postOrder: `);
tree.postOrderForEach(console.log);