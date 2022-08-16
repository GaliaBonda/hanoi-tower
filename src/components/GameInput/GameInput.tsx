import { number } from 'prop-types';
import React, { ChangeEvent } from 'react';
import styled from 'styled-components/macro';

const StyledInput = styled.input`
    border: none;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
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
interface Props {
    value: number;
    handleChange: (value: string) => void;
}

export default function GameInput({ value, handleChange }: Props) {


    return (
        <>
            <StyledLabel>
                How many discs?
                <StyledInput placeholder='3' value={value} 
                onChange={(event: ChangeEvent<HTMLInputElement>) => {handleChange(event.target.value)}}/>
            </StyledLabel>
        </>

    );
}