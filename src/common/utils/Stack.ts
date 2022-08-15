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

    clear(){
        this.items = [];
    }
    getArray() {
        return this.items;
    }
}