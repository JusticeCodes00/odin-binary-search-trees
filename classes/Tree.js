import Node from "./Node.js";
import prettyPrint from "../utils/prettyPrint.js";

export default class Tree {
  #root;

  constructor(arr) {
    this.#root = this.#buildTree(arr);

    // console.log(this.root);
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
    let current = this.#root;

    while (current) {
      if (current.data === value) return true;
      if (value > current.data) current = current.right;
      else current = current.left;
    }

    return false;
  }
}

// TEST
const testArrOne = [1, 5, 8, 11, 13];
const testArrTwo = [15, 20, 50, 80];

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr);

// prettyPrint(tree.root);
console.log(tree.includes(20003));
