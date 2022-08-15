export default class Stack {
    items: any[];
    constructor(stack: any[]) {
        this.items = stack;
    }

    push(element: any) {
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