import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { userEvent, within, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import GameInput from './GameInput';

export default {
    title: 'GameInput',
    component: GameInput,
    decorators: [
        (Story) => (
          <div style={{ maxWidth: '50em' }}>
            <Story />
          </div>
        ),
      ],
      argTypes: {
        handleChange: { action: 'input changed', table: { disable: true, },  },
        formStacks: { action: 'stacks formed', table: { disable: true, },  },
     }
} as ComponentMeta<typeof GameInput>;

const Template: ComponentStory<typeof GameInput> = (args) => <GameInput {...args} />;

export const Standart = Template.bind({});
Standart.args = {
    value: 3,
};

export const WithPopupToggled = Template.bind({});
WithPopupToggled.args = {...Standart.args, shownPopup : false,}

export const FilledInput = Template.bind({});
let inputVal;
FilledInput.args = {
    ...Standart.args, handleChange: (value: string) => inputVal = value, value: inputVal,
};
FilledInput.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId('test-input');
    await userEvent.type(input, '4', {
    });
};

export const FilledInputNan = Template.bind({});
FilledInputNan.args = {
    ...Standart.args,
};
FilledInputNan.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId('test-input');
    await userEvent.type(input, 'h');
    await expect(canvas.getByText('Invalid discs amount!')).toBeInTheDocument();
};

export const FilledInputTooBig = Template.bind({});
FilledInputTooBig.args = {
    ...Standart.args,
};

FilledInputTooBig.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId('test-input');
    await userEvent.type(input, '11');
    await expect(canvas.getByText('Invalid discs amount!')).toBeInTheDocument();
};

export const StartBtnClicked = Template.bind({});
StartBtnClicked.args = {
    ...Standart.args,
};

StartBtnClicked.play = async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const startBtn = canvas.getByRole('button', {name: 'Start'});
    await userEvent.click(startBtn);
    await waitFor(() => expect(args.formStacks).toBeCalled);
};

