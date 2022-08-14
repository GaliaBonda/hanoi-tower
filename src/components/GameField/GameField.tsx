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
      height: `calc(40% / ${discsNumber})`,
      id: 0,
    },
    {
      width: discsNumber - 1,
      color: `hsla(${Math.random() * 360}, 100%, 50%)`,
      height: `calc(40% / ${discsNumber})`,
      id: 1,
    },
    {
      width: discsNumber - 2,
      color: `hsla(${Math.random() * 360}, 100%, 50%)`,
      height: `calc(40% / ${discsNumber})`,
      id: 2,
    }
  ];

  const stackRef = useRef<HTMLDivElement>(null);
  // const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event: MouseEvent) => {
    // console.log(event.target);
    if (stackRef.current) {
      const x = stackRef.current.offsetLeft;
      const x1 = stackRef.current.offsetWidth;

    }

  };
  const handleMouseUp = (event: MouseEvent) => {
    // console.log(event.target);


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
    console.log(target);

  };
  return (
    <>
      <StyledDiv >
        <GameInput />
        <StacksWrapper ref={stackRef} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
          <Stack stack={startStack} moveDisc={moveDisc} />
          <Stack stack={[]} moveDisc={moveDisc} />
          <Stack stack={[]} moveDisc={moveDisc} />
        </StacksWrapper>


      </StyledDiv>
    </>

  );
}
export default GameField;