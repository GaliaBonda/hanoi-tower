import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/macro';
import GameInput from '../GameInput/GameInput';
import Stack from '../Stack/Stack';

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

  const startStack = [
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
  ];

  const [stack1, setStack1] = useState(startStack);
  const [stack2, setStack2] = useState([]);
  const [stack3, setStack3] = useState([]);

  const [targetDisc, setTargetDisc] = useState<EventTarget | null>(null);

  const stackRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: MouseEvent) => {
  };

  const handleMouseUp = (event: MouseEvent) => {
    if (!targetDisc) {
      console.log('moving on wrong');
    } else {
      console.log('all good');
    }

    //Get sizes of stacks: 
    // 1) [offsetLeft, offsetLeft + offsetWidth / 3];
    // 2) (offsetLeft + offsetWidth / 3, offsetLeft + 2 * offsetWidth / 3];
    // 3) (offsetLeft + 2 * offsetWidth / 3, offsetWidth];

    if (stackRef.current) {
      const x = stackRef.current.offsetLeft;
      const x1 = stackRef.current.offsetWidth;

    }

    //Compare with mouse position event.screenX
    //if mouse position <= offsetLeft + offsetWidth / 3 => Target stack pop; stack #1 push
    //if mouse position > offsetLeft + offsetWidth / 3 => Target stack pop; stack #2 push 
    //if mouse position > offsetLeft + 2 * offsetWidth / 3 => Target stack pop; stack #3 push 
    
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

  const moveDisc = (target: EventTarget) => {
    setTargetDisc(target);
    // console.log(target);
  };

  return (
    <>
      <StyledDiv >
        <GameInput />
        <StacksWrapper ref={stackRef} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
          <Stack stack={stack1} moveDisc={moveDisc} id={1} />
          <Stack stack={stack2} moveDisc={moveDisc} id={2} />
          <Stack stack={stack3} moveDisc={moveDisc} id={3} />
        </StacksWrapper>
      </StyledDiv>
    </>

  );
}
export default GameField;