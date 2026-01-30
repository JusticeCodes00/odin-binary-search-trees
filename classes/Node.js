export default class Node {
    #data;
    #left;
    #right;
    constructor(data ) {
        this.#data = data;
        this.#left = null;
        this.#right = null;
    }
}
