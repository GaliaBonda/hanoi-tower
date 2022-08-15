import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/macro';
import GameInput from '../GameInput/GameInput';
import Rod from '../Rod/Rod';
import Stack from '../../common/utils/Stack';
import IStack from '../../common/interfaces/IStack';
import { string } from 'prop-types';

const StyledDiv = styled.div`
  height: 70vh;
  width: 80%;
  border: 1px solid rgb(0 0 0 / 8%);;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: #9edfb8;
  padding: 2em;
  border-radius: 10px;
`;
const StacksWrapper = styled.div`
  display: flex; 
  justify-content: space-around;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  padding: 2em;
`;

function GameField() {
  const [discsNumber, setDiscsNum] = useState(3);

  const startStack = new Stack([
    {
      width: discsNumber - 0,
      color: `hsla(${Math.random() * 360}, 100%, 50%)`,
      height: `calc(25% / ${discsNumber})`,
      id: 0,
      stackId: 1,
    },
    {
      width: discsNumber - 1,
      color: `hsla(${Math.random() * 360}, 100%, 50%)`,
      height: `calc(25% / ${discsNumber})`,
      id: 1,
      stackId: 1,
    },
    {
      width: discsNumber - 2,
      color: `hsla(${Math.random() * 360}, 100%, 50%)`,
      height: `calc(25% / ${discsNumber})`,
      id: 2,
      stackId: 1,
    }
  ]);

  const [stacks, setStacks] = useState<{ [stack: string]: Stack }>({
    stack1: startStack,
    stack2: new Stack([]),
    stack3: new Stack([]),
  });
  // const [stack1, setStack1] = useState(startStack);
  // const [stack2, setStack2] = useState(new Stack([]));
  // const [stack3, setStack3] = useState(new Stack([]));

  const [targetDisc, setTargetDisc] = useState<EventTarget | null>(null);
  const [targetStack, setTargetStack] = useState(0);

  const rodsWrapperRef = useRef<HTMLDivElement>(null);

  // const handleMouseDown = (event: MouseEvent) => {
  // };

  const handleMouseUp = (event: MouseEvent) => {
    if (!targetDisc) {
      return;
    }

    if (!rodsWrapperRef.current) return;
    if (stacks["stack" + targetStack].size() <= 0) return;
    //Get sizes of stacks: 
    // 1) [offsetLeft, offsetLeft + offsetWidth / 3];
    // 2) (offsetLeft + offsetWidth / 3, offsetLeft + 2 * offsetWidth / 3];
    // 3) (offsetLeft + 2 * offsetWidth / 3, offsetWidth];

    const leftPoint = rodsWrapperRef.current.offsetLeft;
    const wrapperWidth = rodsWrapperRef.current.offsetWidth;
    const mousePosition = event.screenX;
    // console.log("leftPoint: " + leftPoint, "wrapperWidth: " + wrapperWidth, "mousePosition: " + mousePosition);

    //Compare with mouse position event.screenX
    //if mouse position <= offsetLeft + offsetWidth / 3 => Target stack pop; stack #1 push
    //if mouse position > offsetLeft + offsetWidth / 3 => Target stack pop; stack #2 push 
    //if mouse position > offsetLeft + 2 * offsetWidth / 3 => Target stack pop; stack #3 push 
    const moveTarget = stacks["stack" + targetStack].peek();
    let finishStack = stacks["stack" + targetStack];
    if (mousePosition <= leftPoint + wrapperWidth / 3) {
      finishStack = stacks.stack1
    } else if (mousePosition > leftPoint + wrapperWidth / 3 && mousePosition <= leftPoint + 2 * wrapperWidth / 3) {
      finishStack = stacks.stack2;
    } else if (mousePosition > leftPoint + 2 * wrapperWidth / 3) {
      finishStack = stacks.stack3;
    }
    const topElement = finishStack.peek();
    if (finishStack.size() > 0 && moveTarget.width > topElement.width) {
      console.log('wrong sizing');
      return;
    }
    // console.log(topElement?.width);
    // console.log(moveTarget?.width);
    
    finishStack.push(stacks["stack" + targetStack].pop());
    setTargetDisc(null);
  };

  // useEffect(() => {
  //   const handleWindowMouseMove = (event: globalThis.MouseEvent) => {
  //     setGlobalCoords({
  //       x: event.screenX,
  //       y: event.screenY,
  //     });
  //   };
  //   window.addEventListener('mousemove', handleWindowMouseMove);

  //   return () => {
  //     window.removeEventListener('mousemove', handleWindowMouseMove);
  //   };
  // }, []);

  const moveDisc = (target: EventTarget, stackId: number) => {
    setTargetDisc(target);
    setTargetStack(stackId);
    // console.log(target, stackId);
    // const targetStack = "stack" + stackId;
    // console.log(stacks[targetStack]);
  };

  return (
    <>
      <StyledDiv >
        <GameInput />
        <StacksWrapper ref={rodsWrapperRef} onMouseUp={handleMouseUp}>
          <Rod stack={stacks.stack1} moveDisc={moveDisc} id={1} />
          <Rod stack={stacks.stack2} moveDisc={moveDisc} id={2} />
          <Rod stack={stacks.stack3} moveDisc={moveDisc} id={3} />
        </StacksWrapper>
      </StyledDiv>
    </>

  );
}
export default GameField;