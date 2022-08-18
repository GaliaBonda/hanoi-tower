import Stack from "./Stack";

const formStacks = (discsNumber: number) => {
    const stack1 = { stack: new Stack([]), id: 1, };
    const stack2 = { stack: new Stack([]), id: 2 };
    const stack3 = { stack: new Stack([]), id: 3 };
    for (let i = 0; i < discsNumber; i++) {
        stack1.stack.push({
            width: discsNumber - i,
            color: `hsla(${Math.random() * 360}, 100%, 50%)`,
            height: `calc(60% / ${discsNumber})`,
            id: i,
        });
    }
    return({
        stack1,
        stack2,
        stack3,
    });
}

export default formStacks;