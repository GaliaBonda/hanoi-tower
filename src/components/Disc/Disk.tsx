import React, { MouseEvent } from 'react';
import styled from 'styled-components/macro';
import IDisc from '../../common/interfaces/IDisc';

const StyledDiv = styled.div`
    border-radius: 15px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    border: 1px solid rgba(0, 0, 0, 0.3);
    calc(40% / 3)
`;

type Props = IDisc & { moveDisc: (target: EventTarget, stackId: number) => void };

export default function Disk({ width, height, color, stackId, moveDisc }: Props) {

    return (
        <StyledDiv style={{
            width: `calc(20% * ${width})`,
            backgroundColor: color,
            height: height,
        }} onClick={(event: MouseEvent) => { event.preventDefault(); moveDisc(event.target, stackId) }} />
    );
}