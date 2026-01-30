
export default class Tree {
    #root;
    constructor(arr) {
        this.#root = this.#buildTree(arr);
    }
    #buildTree(arr) {
        console.log(arr);
    }
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr);
