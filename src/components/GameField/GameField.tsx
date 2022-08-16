import React, { MouseEvent, useRef, useState } from 'react';
import styled from 'styled-components/macro';
import GameInput from '../GameInput/GameInput';
import Rod from '../Rod/Rod';
import Stack from '../../common/utils/Stack';
import Popup from '../Popup/Popup';
import IStack from '../../common/interfaces/IStack';

const StyledDiv = styled.div`
  height: 70vh;
  width: 80%;
  border: 1px solid rgb(0 0 0 / 8%);;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: #9edfb8;
  padding: 2em;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 7em;
`;
const StacksWrapper = styled.div`
  display: flex; 
  justify-content: space-around;
  align-items: flex-end;
  width: 100%;
  height: 60%;
  padding: 2em;
`;
const StyledButton = styled.button`
  background-color: #70b96a;
  text-transform: uppercase;
  border: none;
  padding: 1em 2em;
  border-radius: 10px;
  cursor: pointer;
  border: 3px solid rgba(0, 0, 0, 0.02);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px; 
  }
  `;
const ControlDiv = styled.div`
  display: flex;
  gap: 3em;
  align-items: center;
`;

function GameField() {
  const [discsNumber, setDiscsNum] = useState(3);
  const [popup, setPopup] = useState({
    isShown: false,
    title: '',
    text: '',
  });

  const startStack = new Stack([
    {
      width: discsNumber - 0,
      color: `hsla(${Math.random() * 360}, 100%, 50%)`,
      height: `calc(60% / ${discsNumber})`,
      id: 0,
    },
    {
      width: discsNumber - 1,
      color: `hsla(${Math.random() * 360}, 100%, 50%)`,
      height: `calc(60% / ${discsNumber})`,
      id: 1,
    },
    {
      width: discsNumber - 2,
      color: `hsla(${Math.random() * 360}, 100%, 50%)`,
      height: `calc(60% / ${discsNumber})`,
      id: 2,
    }
  ]);

  const [stacks, setStacks] = useState<{ [stack: string]: IStack }>({
    stack1: { stack: startStack, id: 1},
    stack2:{ stack: new Stack([]), id: 2},
    stack3: {stack: new Stack([]), id: 3},
  });

  const [targetDisc, setTargetDisc] = useState<EventTarget | null>(null);
  const [targetStack, setTargetStack] = useState(0);

  const rodsWrapperRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: MouseEvent) => {
    if (!targetDisc) {
      return;
    }

    if (!rodsWrapperRef.current) return;
    if (stacks["stack" + targetStack].stack.size() === 0) return;
    const leftPoint = rodsWrapperRef.current.offsetLeft;
    const wrapperWidth = rodsWrapperRef.current.offsetWidth;
    const mousePosition = event.screenX;

    const moveTarget = stacks["stack" + targetStack].stack.peek();
    let finishStack = stacks["stack" + targetStack];
    if (mousePosition <= leftPoint + wrapperWidth / 3) {
      finishStack = stacks.stack1
    } else if (mousePosition > leftPoint + wrapperWidth / 3 && mousePosition <= leftPoint + 2 * wrapperWidth / 3) {
      finishStack = stacks.stack2;
    } else if (mousePosition > leftPoint + 2 * wrapperWidth / 3) {
      finishStack = stacks.stack3;
    }
    const topElement = finishStack.stack.peek();
    if (finishStack.stack.size() > 0 && moveTarget.width > topElement.width) {
      setTargetDisc(null);
      setPopup({
        isShown: true,
        title: 'Too big!',
        text: 'You supposed to place smaller disc on bigger disc. And you thought how to build a tower?',
      });
      return;
    }
    const moveTargetDisc = stacks["stack" + targetStack].stack.pop();
    if (moveTargetDisc) finishStack.stack.push(moveTargetDisc);
    setTargetDisc(null);
  };

  const moveDisc = (target: EventTarget, stackId: number) => {
    setTargetDisc(target);
    setTargetStack(stackId);
  };

  const handleChange = (value: string) => {
    setDiscsNum(Number(value));
  }

  const formStacks = () => {
    const stack1 = {stack: new Stack([]), id: 1,};
    const stack2 = {stack: new Stack([]), id: 2};
    const stack3 = {stack: new Stack([]), id: 3};
    for (let i = 0; i < discsNumber; i++) {
      stack1.stack.push({
        width: discsNumber - i,
        color: `hsla(${Math.random() * 360}, 100%, 50%)`,
        height: `calc(60% / ${discsNumber})`,
        id: i,
      });
    }
    setStacks({
      stack1,
      stack2,
      stack3,
    });
  }

  return (
    <>
      <StyledDiv >
        <ControlDiv>
          <GameInput value={discsNumber} handleChange={handleChange} />
          <StyledButton onClick={formStacks}>Start</StyledButton>
        </ControlDiv>
        <StacksWrapper ref={rodsWrapperRef} onClick={handleClick}>
          <Rod stack={stacks.stack1.stack} moveDisc={moveDisc} id={stacks.stack1.id} />
          <Rod stack={stacks.stack2.stack} moveDisc={moveDisc} id={stacks.stack2.id} />
          <Rod stack={stacks.stack3.stack} moveDisc={moveDisc} id={stacks.stack3.id} />
        </StacksWrapper>
      </StyledDiv>
      {popup.isShown && <Popup title={popup.title} text={popup.text}
        closePopup={() => setPopup({
          isShown: false,
          title: '',
          text: '',
        })} />}
    </>

  );
}
export default GameField;