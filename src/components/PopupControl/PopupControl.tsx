import React from 'react';
import styled from 'styled-components/macro';

const StyledDiv = styled.div`
  display: flex;
  gap: 2em;
  justify-content: space-around;
`;
const StyledBtn = styled.button`
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

interface Props {
  okHandle?: () => void;
  cancelHandle: () => void;
}

export default function PopupControl({ okHandle, cancelHandle }: Props) {
  return (
    <>
      <StyledDiv>
        <StyledBtn onClick={okHandle}>Ok, let's go</StyledBtn>
        <StyledBtn onClick={cancelHandle}>Not interested</StyledBtn>
      </StyledDiv>
    </>
  );
}
