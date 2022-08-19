import React, { ChangeEvent, FocusEvent, useState } from 'react';
import styled from 'styled-components/macro';
import Popup from '../Popup/Popup';

const StyledInput = styled.input`
  border: none;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  width: 5em;
  background-color: #9edfb8;
  border-radius: 15px;
  padding: 0.5em;
  text-align: center;
  font-size: 1rem;
  &:focus-visible {
    outline: none;
    border: 2px solid rgba(50, 50, 93, 0.25);
  }
`;

const StyledLabel = styled.label`
  display: flex;
  column-gap: 1em;
  align-items: baseline;
  text-transform: uppercase;
  font-weight: bold;
`;

const StyledButton = styled.button`
  background-color: #70b96a;
  text-transform: uppercase;
  border: none;
  padding: 1em 2em;
  border-radius: 10px;
  cursor: pointer;
  border: 3px solid rgba(0, 0, 0, 0.02);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px,
    rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
      rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
      rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  }
  &:focus {
    outline: none;
  }
`;
const ControlDiv = styled.div`
  display: flex;
  gap: 3em;
  align-items: center;
  height: 10%;
`;

interface Props {
  value: number;
  handleChange: (value: string) => void;
  formStacks: () => void;
}

export default function GameInput({ value, handleChange, formStacks }: Props) {
  const [popup, setPopup] = useState(false);
  const handleInputChange = (value: string) => {
    const numberValue = Number(value);
    if (!numberValue || numberValue < 0 || numberValue > 10) {
      setPopup(true);
      return;
    }
    handleChange(numberValue.toString());
  };

  return (
    <>
      <ControlDiv>
        <StyledLabel>
          How many discs?
          <StyledInput
            placeholder='3'
            value={value}
            onFocus={(event: FocusEvent<HTMLInputElement>) =>
              event.target.select()
            }
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleInputChange(event.target.value);
            }}
          />
        </StyledLabel>
        <StyledButton onClick={formStacks}>Start</StyledButton>
      </ControlDiv>
      {popup && (
        <Popup
          title='Invalid discs amount!'
          text='Please, enter only positive numerical values from 1 to 10. Or make you`re own game'
          closePopup={() => setPopup(false)}
          gameControl={false}
        />
      )}
    </>
  );
}
