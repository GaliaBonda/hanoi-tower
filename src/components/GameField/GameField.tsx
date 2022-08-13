import React from 'react';
import styled from 'styled-components';
import GameInput from '../GameInput/GameInput';

const StyledDiv = styled.div`
  height: 70vh;
  width: 80%;
  border: 1px solid rgb(0 0 0 / 8%);;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: #9edfb8;
  padding: 2em;
  border-radius: 10px;
`;




function GameField() {
    return (
        <>
            <StyledDiv >
                <GameInput />
            </StyledDiv>
        </>

    );
}
export default GameField;