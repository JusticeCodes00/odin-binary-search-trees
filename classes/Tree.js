import Node from "./Node.js";
import prettyPrint from "../utils/prettyPrint.js";

export default class Tree {
  #root;

  constructor(arr) {
    this.#root = this.#buildTree(arr);

    prettyPrint(this.#root);
  }

  #merge(leftArr, rightArr) {
    let [i, j] = [0, 0];
    const result = [];

    // Merge two sorted arrays
    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] < rightArr[j]) {
        result.push(leftArr[i++]);
      } else {
        result.push(rightArr[j++]);
      }
    }

    // Add remaining elements
    while (i < leftArr.length) result.push(leftArr[i++]);
    while (j < rightArr.length) result.push(rightArr[j++]);

    return result;
  }

  #mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = this.#mergeSort(arr.slice(0, mid));
    const right = this.#mergeSort(arr.slice(mid));
    return this.#merge(left, right);
  }

  #buildTree(arr) {
    arr = this.#mergeSort([...new Set(arr)]); // Remove duplicate and sort array
    return this.#sortedArrayToBSTRecur(arr, 0, arr.length - 1);
  }

  #sortedArrayToBSTRecur(arr, start, end) {
    if (start > end) return null;

    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(arr[mid]);

    // Divide from middle element
    root.left = this.#sortedArrayToBSTRecur(arr, start, mid - 1);
    root.right = this.#sortedArrayToBSTRecur(arr, mid + 1, end);

    return root;
  }

  includes(value) {
    if (!this.#root) return false;

    let current = this.#root;

    while (current) {
      if (current.data === value) return true;
      if (value > current.data) current = current.right;
      else current = current.left;
    }

    return false;
  }

  insert(value) {
    if (!this.#root) {
      this.#root = new Node(value);
      return;
    }

    let current = this.#root;
    let prev = null;

    while (current) {
      if (current.data === value) return;
      prev = current;
      if (value > current.data) current = current.right;
      else current = current.left;
    }

    const newNode = new Node(value);
    if (value > prev.data) prev.right = newNode;
    else if (value < prev.data) prev.left = newNode;
  }

  deleteItem(value) {
    if (!this.#root) return;

    let current = this.#root;
    let prev = null;

    while (current) {
      if (current.data === value) {
        break;
      }

      prev = current;
      if (value > current.data) current = current.right;
      else current = current.left;
    }

    if (!current) return; // value is not in list, exit

    const nodeHasNoChildren = !current.left && !current.right;
    const nodeHasOneChild =
      (!current.left && current.right) || (current.left && !current.right);
    const targetOnPrevLeft = prev?.left === current;
    const targetOnPrevRight = prev?.right === current;
    const isRoot = !prev;

    if (isRoot) {
      // current is root
      if (nodeHasNoChildren) {
        this.#root = null;
      } else if (nodeHasOneChild) {
        this.#root = current.left ?? current.right;
      } else {
        const value = this.#getSuccessorValue(current.right);
        this.deleteItem(value);
        current.data = value;
      }
      return;
    }

    if (nodeHasNoChildren) {
      // Find the side on the prev node where the target is and break the link
      if (targetOnPrevLeft) prev.left = null;
      else if (targetOnPrevRight) prev.right = null;
    }

    if (nodeHasOneChild) {
      let temp = current.left ?? current.right;

      if (targetOnPrevLeft) prev.left = temp;
      else if (targetOnPrevRight) prev.right = temp;
    } else {
      const value = this.#getSuccessorValue(current.right);
      this.deleteItem(value);
      current.data = value;
    }
  }

  #getSuccessorValue(root) {
    if (!root) return;
    let current = root;
    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  levelOrderForEach(callback) {
    if (!callback || typeof callback !== "function") {
      throw new Error("A callback is required");
    }

    const queue = [this.#root];
    while (queue.length) {
      const current = queue.shift();
      callback(current.data);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }

  // TODO: write when done with project
  levelOrderForEachRecur(callback, root = this.#root) {}

  // root, left , right
  preOrderForEach(callback, root = this.#root) {
    if (!root) return;
    callback(root.data);
    this.preOrderForEach(callback, root.left);
    this.preOrderForEach(callback, root.right);
  }

  // left, root, right
  inOrderForEach(callback, root = this.#root) {
    if (!root) return;
    this.inOrderForEach(callback, root.left);
    callback(root.data);
    this.inOrderForEach(callback, root.right);
  }

  // left, right, root
  postOrderForEach(callback, root = this.#root) {
    if (!root) return;
    this.postOrderForEach(callback, root.left);
    this.postOrderForEach(callback, root.right);
    callback(root.data);
  }

  depth(value) {
    let current = this.#root;
    let count = 0;

    while (current) {
      if (current.data === value) break;
      if (value > current.data) current = current.right;
      else current = current.left;
      count++;
    }

    if (!current) return;

    return count;
  }

  //   #findRecur(node, value) {
  //     if (!node) return;
  //     else if (node.data === value) return node;
  //     else if (value > node.data) return this.#findRecur(node.right, value);
  //     else return this.#findRecur(node.left, value);
  //   }

  //   height(value) {
  //     return this.#findRecur(this.#root, value);
  //   }
}

// TEST
const testArrOne = [1, 5, 8, 11, 13];
const testArrTwo = [15, 20, 50, 80];

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr);

// prettyPrint(tree.root);

// console.log(tree.deleteItem(4));

console.log(tree.height(7));
