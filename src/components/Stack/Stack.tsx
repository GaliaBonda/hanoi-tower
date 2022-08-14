import React, { useState } from 'react';
import styled from 'styled-components/macro';
import Disk from '../Disc/Disk';




function Stack() {
    const StyledDiv = styled.div`
        height: 60%;
        position: relative;
        width: 2em;
        background-color: #6e6868;
        border-radius: 15px;
        box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
        &::before {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            border-radius: 50%;
            height: 18px;
            background-color: #625c5c;
            box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
        }
        `;
    const WrapperDiv = styled.div`
        width: calc(100% / 3);
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;`;

    const [discksNumber, setDiscsNum] = useState(3);
    const [stack, setStack] = useState([
        {
            width: discksNumber - 0,
            color: `hsla(${Math.random() * 360}, 100%, 50%)`,
            height: `calc(100% / 3)`,
            id: 0,
        },
        {
            width: discksNumber - 1,
            color: `hsla(${Math.random() * 360}, 100%, 50%)`,
            height: `calc(100% / 3)`,
            id: 1,
        },
        {
            width: discksNumber - 2,
            color: `hsla(${Math.random() * 360}, 100%, 50%)`,
            height: `calc(100% / 3)`,
            id: 2,
        }
    ]);

    return (
        <WrapperDiv>
            <StyledDiv />
            <Disk width={1} id={0} color="" />
        </WrapperDiv>
    );
}
export default Stack;