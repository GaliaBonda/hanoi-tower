import React from 'react';
import styled from 'styled-components/macro';
import Disk from '../Disc/Disk';
import GameInput from '../GameInput/GameInput';
import Stack from '../Stack/Stack';






function GameField() {
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

  return (
    <>
      <StyledDiv >
        <GameInput />
        <StacksWrapper>
          <Stack />
          <Stack />
          <Stack />
        </StacksWrapper>


      </StyledDiv>
    </>

  );
}
export default GameField;