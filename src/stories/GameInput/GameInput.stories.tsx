import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { userEvent, within, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import GameInput from './GameInput';

export default {
    title: 'GameInput',
    component: GameInput,
    decorators: [
        (Story) => (
          <div style={{ maxWidth: '10em' }}>
            <Story />
          </div>
        ),
      ],
      argTypes: {
        handleChange: { action: 'input changed' },
        formStacks: { action: 'stacks formed' },
     }
} as ComponentMeta<typeof GameInput>;

const Template: ComponentStory<typeof GameInput> = (args) => <GameInput {...args} />;

export const Standart = Template.bind({});
Standart.args = {
    value: 3,
};

export const FilledInput = Template.bind({});
let inputVal;
FilledInput.args = {
    ...Standart.args,
};
FilledInput.play = async () => {
    const input = screen.getByTestId('test-input');
    await userEvent.type(input, '4', {
    });
};

export const FilledInputNan = Template.bind({});
FilledInputNan.args = {
    ...Standart.args,
};
FilledInputNan.play = async ({ canvasElement }) => {
    const input = screen.getByTestId('test-input');
    await userEvent.type(input, 'h');
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Invalid discs amount!')).toBeInTheDocument();
};

export const FilledInputTooBig = Template.bind({});
FilledInputTooBig.args = {
    ...Standart.args,
};

FilledInputTooBig.play = async ({ canvasElement }) => {
    const input = screen.getByTestId('test-input');
    await userEvent.type(input, '11');
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Invalid discs amount!')).toBeInTheDocument();
};

export const StartBtnClicked = Template.bind({});
StartBtnClicked.args = {
    ...Standart.args,
};

StartBtnClicked.play = async () => {
    const startBtn = screen.getByRole('button', {name: 'Start'});
    await userEvent.click(startBtn);
};

