import React, { MouseEvent, useState } from 'react';
import styled from 'styled-components/macro';

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(0 0 0 / 54%);
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    `;

const StyledDiv = styled.div`
    position: relative;
    width: 40em;
    height: 30em;
    background-color: #d2e5d4;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-item: center;
    flex-direction: column;
    padding: 1.5em;
    `;

const StyledHeading = styled.h2`
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    font-size: 2em;
    `;
const StyledParagraph = styled.p`
    text-align: center;
    font-size: 1.5em;
    `;
const StyledCloseBtn = styled.button`
    position: absolute;
    border: none;
    background: transparent;
    top: 2em;
    right: 2em;
    width: 3em;
    height: 3em;
    cursor: pointer;
    `;

interface Props {
    title: string;
    text: string;
    closePopup: () => void;
}

export default function Popup({ title, text, closePopup }: Props) {
    
    return (
        <Overlay>
            <StyledDiv>
                <StyledHeading>{title}</StyledHeading>
                <StyledParagraph>{text}</StyledParagraph>
                <StyledCloseBtn onClick={closePopup}>
                    <svg version="1.1" viewBox="0 0 20.699 21.479" xmlns="http://www.w3.org/2000/svg">
                        <g transform="translate(1.632 1.6339)">
                            <path d="m-2.5783e-4 -0.0014681 17.436 18.214" fill="#5f6368" stroke="#5f6368" strokeWidth="3.2316" />
                            <path d="m-2.5783e-4 18.212 17.436-18.214" fill="#5f6368" stroke="#5f6368" strokeWidth="3.2316" />
                        </g>
                    </svg>
                </StyledCloseBtn>
            </StyledDiv>
        </Overlay>
    );
}