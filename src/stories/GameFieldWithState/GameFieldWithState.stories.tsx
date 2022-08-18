import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GameFieldWithState from './GameFieldWithState';
import Stack from '../../common/utils/Stack';
import formStacks from '../../common/utils/formStacks';
import { action } from '@storybook/addon-actions';
import * as RodStories from '../Rod/Rod.stories';

export default {
    title: 'GameFieldWithState',
    component: GameFieldWithState,
} as ComponentMeta<typeof GameFieldWithState>;
const Template: ComponentStory<typeof GameFieldWithState> = (args) => <GameFieldWithState {...args} />;

export const Standart = Template.bind({});

Standart.args = {
    discsNumber: 3,
    popup: {
        isShown: false,
        title: '',
        text: '',
    },
    winPopup: false,
    stacks: {
        stack1: { stack: formStacks(3).stack1.stack, id: 1 },
        stack2: { stack: new Stack([]), id: 2 },
        stack3: { stack: new Stack([]), id: 3 },
    },
    closePopup: action('close popup'),
    closeWinPopup: action('close win popup'),
    formStateStacks: action('form state stacks'),
};

export const FiveDiscsGame = Template.bind({});
FiveDiscsGame.args = {
    ...Standart.args, discsNumber: 5, stacks: {
        stack1: { stack: RodStories.FiveDiscsRod.args?.stack || new Stack([]), id: 1 },
        stack2: { stack: new Stack([]), id: 2 },
        stack3: { stack: new Stack([]), id: 3 },
    },
};

export const WithPopup = Template.bind({});
WithPopup.args = {
    ...Standart.args,
    popup: {
        isShown: true,
        title: 'Test popup',
        text: 'Testing this popup',
    }
};
export const WithWinPopup = Template.bind({});
WithWinPopup.args = {
    ...Standart.args, winPopup: true,
};

export const TopDiscOnSecondRod = Template.bind({});
const startStack = formStacks(3).stack1.stack;
TopDiscOnSecondRod.args = {
    ...Standart.args,
    stacks: {
        stack1: { stack: new Stack(startStack.getArray().slice(0, startStack.size() - 1)), id: 1 },
        stack2: { stack: new Stack([startStack.getArray()[startStack.size() - 1]]), id: 2 },
        stack3: { stack: new Stack([]), id: 3 },
    }
}
