import React, { useState } from 'react';
import styled from 'styled-components/macro';
import IStack from '../../common/interfaces/IStack';
import Disc from '../Disc/Disc';
import Popup from '../Popup/Popup';

interface StyleProps {
    discsNum: number;
}
const StyledDiv = styled.div.attrs(({discsNum}: StyleProps) => ({discsNum}))`

        height: 100%;
        position: relative;
        width: ${props => 4 / props.discsNum}em;
        background-color: #6e6868;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
        &::before {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            top: -2px;
            border-radius: 50%;
            height: 10px;
            background-color: #625c5c;
            box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
        }
        &::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: -3px;
            border-radius: 50%;
            height: 10px;
            background-color: #6e6868;
            box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
       
        }`;

const WrapperDiv = styled.div`
        width: calc(100% / 3);
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;`;

const DiscsWrapper = styled.div`
        display: flex;
        flex-direction: column-reverse;
        justify-content: flex-start;
        align-items: center;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        padding: 2em 1em;`;

type TestProps = IStack & { 
    moveDisc: (target: EventTarget, stackId: number) => void; 
    discsNum: number;
    warningPopup?: boolean; 
};

function Rod({ stack, id = 1, moveDisc, discsNum, warningPopup = false }: TestProps) {
const [popupShown, setPopupShown] = useState(false);

    const wrongDiskAlert = () => {
        setPopupShown(true);
    }

    return (
        <>
        <WrapperDiv data-testid='test-rod'>
            <StyledDiv discsNum={discsNum}/>
            <DiscsWrapper>
                {stack.getArray().map((item, index) => {
                    return (
                        <Disc width={item.width} key={item.id} color={item.color} id={item.id}
                            height={item.height} stackId={id} 
                            moveDisc={index === stack.getArray().length - 1 ? moveDisc : wrongDiskAlert} discsNum={discsNum} />
                    );
                })}
            </DiscsWrapper>
        </WrapperDiv>
        {popupShown && 
        <Popup title='Missed!' text="Only the top disc can be moved. It looks like you're trying to ruin the tower..."
            closePopup={() => setPopupShown(false)} gameControl={false} okLabel='' cancelLabel='' backgrounColor='#70b96a'/>}
        {warningPopup && 
        <Popup title='Missed!' text="Only the top disc can be moved. It looks like you're trying to ruin the tower..."
            closePopup={() => setPopupShown(false)} gameControl={false} okLabel='' cancelLabel='' backgrounColor='#70b96a' />}
        </>
    );
}
export default Rod;