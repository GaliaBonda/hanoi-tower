import React, { MouseEvent, useState } from 'react';
import styled, { Keyframes, keyframes } from 'styled-components/macro';
import IDisc from '../../common/interfaces/IDisc';
import { action } from '@storybook/addon-actions';

interface StyleProps {
    width: number;
    color: string;
    height: string;
    animation: Keyframes | string;
    discsNum: number;
}

const discAnimation = keyframes`
    50% { opacity: 0.4; }`;

const StyledDiv = styled.div.attrs((props: StyleProps) => ({
    width: props.width,
    color: props.color,
    height: props.height,
    animation: props.animation,
    discsNum: props.discsNum,
}))`
    border-radius: 15px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    border: 1px solid rgba(0, 0, 0, 0.3);
    width: ${props => `${100/props.discsNum * props.width}%`};
    background-color: ${props => props.color};
    height: ${props => props.height};
    animation: ${props => props.animation} 1s linear infinite;
    &:focus {
        border: 1px solid rgba(0, 0, 0, 0.4);
        outline: none;
    }
`;

type TestProps = IDisc & { 
    moveDisc: (target: EventTarget, stackId: number) => void;
     discsNum: number; 
     animatedState?: boolean; 
};

export default function Disc({ width, height, color, stackId, discsNum, moveDisc = action('move disc'), animatedState }: TestProps) {
    const [animatedDisc, setAnimatedDisk] = useState(false);

    const stopAnimation = () => {
        setAnimatedDisk(false);
        document.removeEventListener("click", stopAnimation);
    }

    const handleClick = (event: MouseEvent) => {
        if (stackId) moveDisc(event.target, stackId);
        setAnimatedDisk(true);
        event.stopPropagation();
        document.addEventListener("click", stopAnimation);
    }

    return (
        <StyledDiv width={width} height={height} color={color} onClick={(event: MouseEvent) => { handleClick(event) }} 
        animation={(animatedDisc || animatedState) ? discAnimation : ""} discsNum={discsNum} onBlur={() => setAnimatedDisk(false)} 
        tabIndex={0} data-testid="test-disc"/>
    );
}