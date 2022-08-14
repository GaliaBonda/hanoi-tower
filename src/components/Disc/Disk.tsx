import React from 'react';
import styled from 'styled-components/macro';
import IDisk from '../../common/interfaces/IDisk';

const StyledDiv = styled.div`
    border-radius: 30%;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    border: 1px solid rgba(0, 0, 0, 0.3);
`;

export default function Disk({ width, height, color }: IDisk) {

    return (
        <StyledDiv style={{
            width: `calc(70% / ${width})`,
            height: height,
            backgroundColor: color,
        }}>

        </StyledDiv>
    );
}