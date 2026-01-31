export default class Node {
  #data;
  #left;
  #right;
  constructor(data) {
    this.#data = data;
    this.#left = null;
    this.#right = null;
  }

  get data() {
    return this.#data;
  }

  get left() {
    return this.#left;
  }

  get right() {
    return this.#right;
  }

  set left(node) {
    this.#left = node;
  }

  set right(node) {
    this.#right = node;
  }
}
