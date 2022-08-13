import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
display: block;
border: none;
width: 10em;
height: 5em;
box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;

background-color: #9edfb8;
border-radius: 15px;
margin-top: 1em;
margin-bottom: 1em;
padding: 1em;
&:focus-visible {
    outline: none;
box-shadow: rgb(0 0 0 / 17%) 0px -23px 25px 0px inset, rgb(0 0 0 / 6%) 0px 2px 1px, rgb(0 0 0 / 9%) 0px 4px 2px;
}
`;

const StyledLabel = styled.label`
display: block;

`;

export default function GameInput() {
    return (
        <>
            <StyledLabel>
                Ur challenge be like...
                <StyledInput placeholder='Number of discs...' />
            </StyledLabel>
        </>

    );
}