import React from 'react';
import styled from 'styled-components/macro';

const StyledDiv = styled.div`
  height: 60%;
  position: relative;
  width: 2em;
background-color: #6e6868;
border-radius: 15px;
&::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    border-radius: 50%;
    height: 18px;
    background-color: #625c5c;
}
`;


function Stack() {
    return (
        <>
            <StyledDiv />
        </>

    );
}
export default Stack;