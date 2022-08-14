import React from 'react';
import styled from 'styled-components/macro';
import IDisk from '../../common/interfaces/IDisk';



export default function Disk({ width }: IDisk) {
    const StyledDiv = styled.div`
width: calc(100% / ${width});
position: absolute;
`;
    return (
        <StyledDiv>
            disk
        </StyledDiv>
    );
}