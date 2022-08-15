import IDisc from "../interfaces/IDisc";

export default class Stack {
    items: IDisc[];
    constructor(stack: IDisc[]) {
        this.items = stack;
    }

    push(element: IDisc) {
        this.items.push(element);
    }

    pop() {
        if(this.items.length > 0) {
            return this.items.pop();
        } 
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    getArray() {
        return this.items;
    }

    size() {
        return this.items.length;
    }
}