import React, { MouseEvent, useRef, useState } from 'react';
import styled from 'styled-components/macro';

import IStacks from '../../common/interfaces/IStacks';
import defineFinishStack from '../../common/utils/defineFinishStack';
import Stack from '../../common/utils/Stack';
import GameInput from '../GameInput/GameInput';
import Popup from '../Popup/Popup';
import Rod from '../Rod/Rod';

const StyledDiv = styled.div`
  height: 70vh;
  width: 80%;
  border: 1px solid rgb(0 0 0 / 8%);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: #9edfb8;
  padding: 2em;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 7em;
`;
const StacksWrapper = styled.div`
box-sizing: border-box;
  display: flex; 
  justify-content: space-around;
  align-items: flex-end;
  width: 100%;
  height: 60%;
  padding: 2em;
`;


function GameField() {
    const [discsNumber, setDiscsNum] = useState(3);
    const [popup, setPopup] = useState({
        isShown: false,
        title: '',
        text: '',
    });
    const [winPopup, setWinPopup] = useState(false);

    const startStack = new Stack([
        {
            width: discsNumber - 0,
            color: `hsla(${Math.random() * 360}, 100%, 50%)`,
            height: `calc(60% / ${discsNumber})`,
            id: 0,
        },
        {
            width: discsNumber - 1,
            color: `hsla(${Math.random() * 360}, 100%, 50%)`,
            height: `calc(60% / ${discsNumber})`,
            id: 1,
        },
        {
            width: discsNumber - 2,
            color: `hsla(${Math.random() * 360}, 100%, 50%)`,
            height: `calc(60% / ${discsNumber})`,
            id: 2,
        }
    ]);

    const [stacks, setStacks] = useState<IStacks>({
        stack1: { stack: startStack, id: 1 },
        stack2: { stack: new Stack([]), id: 2 },
        stack3: { stack: new Stack([]), id: 3 },
    });

    const { stack1, stack2, stack3 } = stacks;

    const [targetDisc, setTargetDisc] = useState<EventTarget | null>(null);
    const [targetStack, setTargetStack] = useState(0);

    const rodsWrapperRef = useRef<HTMLDivElement>(null);

    const handleClick = (event: MouseEvent) => {
        if (!targetDisc) {
            return;
        }
        if (!rodsWrapperRef.current) return;
        if (stacks["stack" + targetStack].stack.size() === 0) return;
        const moveTarget = stacks["stack" + targetStack].stack.peek();
        const finishStack = defineFinishStack(stacks, targetStack, rodsWrapperRef.current.offsetLeft,
            rodsWrapperRef.current.offsetWidth, event.clientX);
        const topElement = finishStack.stack.peek();
        if (finishStack.stack.size() > 0 && moveTarget.width > topElement.width) {
            setTargetDisc(null);
            setPopup({
                isShown: true,
                title: 'Too big!',
                text: 'You supposed to place smaller disc on bigger disc. And you thought how to build a tower?',
            });
            return;
        }
        const moveTargetDisc = stacks["stack" + targetStack].stack.pop();
        if (moveTargetDisc) finishStack.stack.push(moveTargetDisc);
        if (stack2.stack.size() === discsNumber || stack3.stack.size() === discsNumber) {
            setWinPopup(true);
        }
        setTargetDisc(null);
    };

    const moveDisc = (target: EventTarget, stackId: number) => {
        setTargetDisc(target);
        setTargetStack(stackId);
    };

    const handleChange = (value: string) => {
        setDiscsNum(Number(value));
    }

    const formStacks = () => {
        const stack1 = { stack: new Stack([]), id: 1, };
        const stack2 = { stack: new Stack([]), id: 2 };
        const stack3 = { stack: new Stack([]), id: 3 };
        for (let i = 0; i < discsNumber; i++) {
            stack1.stack.push({
                width: discsNumber - i,
                color: `hsla(${Math.random() * 360}, 100%, 50%)`,
                height: `calc(60% / ${discsNumber})`,
                id: i,
            });
        }
        setStacks({
            stack1,
            stack2,
            stack3,
        });
    }

    const startNewGame = () => {
        formStacks();
        setWinPopup(false);
    }

    const stacksSize = stack1.stack.size() + stack2.stack.size() + stack3.stack.size();

    return (
        <>
            <StyledDiv >
                <GameInput value={discsNumber} handleChange={handleChange} formStacks={formStacks} />
                <StacksWrapper data-testid='test-stacks-wrapper' ref={rodsWrapperRef} onClick={handleClick}>
                    {Object.values(stacks).map((item) => {
                        return (<Rod stack={item.stack} moveDisc={moveDisc} id={item.id} key={item.id}
                            discsNum={stacksSize} />);
                    })}
                </StacksWrapper>
            </StyledDiv>
            {popup.isShown && <Popup title={popup.title} text={popup.text}
                closePopup={() => setPopup({
                    isShown: false,
                    title: '',
                    text: '',
                })} gameControl={false} okLabel='Ok' cancelLabel='Cancel' />}
            {winPopup && <Popup title='Congratulations!!!&#127881;' text="Who's the winner? You are the winner! Would you dare to take another round?"
                closePopup={() => setWinPopup(false)} gameControl={true} okHandle={startNewGame} okLabel='Ok' cancelLabel='Cancel' />}
        </>

    );
}
export default GameField;