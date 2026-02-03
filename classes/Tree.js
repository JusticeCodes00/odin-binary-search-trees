import Node from "./Node.js";

export default class Tree {
    #root;

    constructor(arr) {
        this.#root = this.#buildTree(arr);
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

    #find(value) {
        return this.#findRecur(this.#root, value);
    }

    #findRecur(node, value) {
        if (!node) return;
        if (node.data === value) return node;
        else if (value < node.data) return this.#findRecur(node.left, value);
        else if (value > node.data) return this.#findRecur(node.right, value);
    }

    includes(value) {
        return this.#find(value) ? true : false;
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
            (!current.left && current.right) ||
            (current.left && !current.right);
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
        const count = 0;
        const current = this.#root;

        while (current) {
            if (current.data === value) break;
            if (current.data > value) current = current.left;
            else current = current.right;
            count++;
        }

        if (!current) return;
        return count;
    }

    height(value) {
        const node = this.#find(value);
        if (!node) return;
        return this.#getNodeHeight(node);
    }

    #getNodeHeight(node) {
        if (!node) return -1;
        return (
            1 +
            Math.max(
                this.#getNodeHeight(node.left),
                this.#getNodeHeight(node.right)
            )
        );
    }

    prettyPrint(node = this.#root, prefix = "", isLeft = true) {
        if (node === null || node === undefined) {
            return;
        }

        this.prettyPrint(
            node.right,
            `${prefix}${isLeft ? "│   " : "    "}`,
            false
        );
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        this.prettyPrint(
            node.left,
            `${prefix}${isLeft ? "    " : "│   "}`,
            true
        );
    }

    isBalanced() {
        if (!this.#root) return true; // empty tree is balanced
        return this.#isTreeBalancedRecur(this.#root);
    }

    #isTreeBalancedRecur(node) {
        if (!node) return true;

        if (
            Math.abs(
                this.#getNodeHeight(node.left) - this.#getNodeHeight(node.right)
            ) > 1
        )
            return false;

        return (
            this.#isTreeBalancedRecur(node.left) &&
            this.#isTreeBalancedRecur(node.right)
        );
    }

    rebalance() {
        if (!this.#root || this.isBalanced()) return;
        const arr = [];
        this.levelOrderForEach(value => arr.push(value));
        this.#root = this.#buildTree(arr);
    }
}
