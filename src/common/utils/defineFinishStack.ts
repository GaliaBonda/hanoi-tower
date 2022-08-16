import IStacks from "../interfaces/IStacks";

const defineFinishStack = (stacks: IStacks, targetStack: number, leftPoint: number, wrapperWidth: number, mousePosition: number) => {
    let finishStack = stacks["stack" + targetStack];

    if (mousePosition <= leftPoint + wrapperWidth / 3) {
      finishStack = stacks.stack1
    } else if (mousePosition > leftPoint + wrapperWidth / 3 && mousePosition <= leftPoint + 2 * wrapperWidth / 3) {
      finishStack = stacks.stack2;
    } else if (mousePosition > leftPoint + 2 * wrapperWidth / 3) {
      finishStack = stacks.stack3;
    }
    return finishStack;
  };

export default defineFinishStack;