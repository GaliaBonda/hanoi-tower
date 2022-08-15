import React from 'react';
import styled from 'styled-components/macro';
import IDisc from '../../common/interfaces/IDisc';
import IStack from '../../common/interfaces/IStack';
import Disk from '../Disc/Disk';

const StyledDiv = styled.div`
        height: 50%;
        position: relative;
        width: 1.5em;
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
       
        }
        `;
const WrapperDiv = styled.div`
        width: calc(100% / 3);
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;`;
const DiscsWrapper = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;`;

type Props = IStack & { moveDisc: (target: EventTarget) => void };

function Rod({ stack, id, moveDisc }: Props) {
    const wrongDiskAlert = () => {
        // console.log('wrong disk');
    }
    return (
        <WrapperDiv>
            <StyledDiv />
            <DiscsWrapper>
                {stack.getArray().map((item, index) => {
                    return (
                        <Disk width={item.width} key={item.id} color={item.color} id={item.id}
                            height={item.height} stackId={id} moveDisc={index === 0 ? moveDisc : wrongDiskAlert} />
                    );
                })}
            </DiscsWrapper>
        </WrapperDiv>
    );
}
export default Rod;