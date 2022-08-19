import { action } from '@storybook/addon-actions';
import React, { useRef } from 'react';
import styled from 'styled-components/macro';
import IStacks from '../../common/interfaces/IStacks';
import GameInput from '../GameInput/GameInput';
import Popup from '../Popup/Popup';
import Rod from '../Rod/Rod';

const StyledDiv = styled.div`
  height: 70vh;
  width: 80%;
  border: 1px solid rgb(0 0 0 / 8%);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: #9edfb8;
  padding: 2em;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 7em;
`;
const StacksWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  width: 100%;
  height: 60%;
  padding: 2em;
`;

interface TestProps {
  discsNumber?: number;
  popup: {
    isShown: boolean;
    title: string;
    text: string;
  };
  winPopup?: boolean;
  stacks: IStacks;
  closePopup: () => void;
  closeWinPopup: () => void;
  formStateStacks: () => void;
}

function GameFieldWithState({
  discsNumber = 3,
  popup,
  winPopup,
  stacks,
  closePopup,
  closeWinPopup,
  formStateStacks,
}: TestProps) {
  const { stack1, stack2, stack3 } = stacks;
  const rodsWrapperRef = useRef<HTMLDivElement>(null);
  const stacksSize =
    stack1.stack.size() + stack2.stack.size() + stack3.stack.size();

  return (
    <>
      <StyledDiv>
        <GameInput
          value={discsNumber}
          handleChange={action('input changed')}
          formStacks={formStateStacks}
        />
        <StacksWrapper
          data-testid='test-stacks-wrapper'
          ref={rodsWrapperRef}
          onClick={action('click on game field')}
        >
          {Object.values(stacks).map((item) => {
            return (
              <Rod
                stack={item.stack}
                moveDisc={action('move disc')}
                id={item.id}
                key={item.id}
                discsNum={stacksSize}
              />
            );
          })}
        </StacksWrapper>
      </StyledDiv>
      {popup.isShown && (
        <Popup
          title={popup.title}
          text={popup.text}
          closePopup={closePopup}
          gameControl={false}
          okLabel='Ok'
          cancelLabel='Cancel'
        />
      )}
      {winPopup && (
        <Popup
          title='Congratulations!!!&#127881;'
          text="Who's the winner? You are the winner! Would you dare to take another round?"
          closePopup={closeWinPopup}
          gameControl={true}
          okHandle={action('new game started')}
          okLabel='Ok'
          cancelLabel='Cancel'
        />
      )}
    </>
  );
}
export default GameFieldWithState;
