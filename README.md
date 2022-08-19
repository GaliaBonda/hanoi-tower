input: 3 Stacks with N discs

output: result of move:

1.  user won;
2.  disc moved to another Stack;
3.  disc not moved (user mistake).

Procedure

move(startStack, finishStack) {

disc = startStack.pop();

if (!disc) return false;

topElement = finishStack.peek();

if (finishStack is empty || topElement > disc) {

    finishStack.push(disc);

    if (finishStack.length === N) congrats;

    return true;

    }

    return false;

}
