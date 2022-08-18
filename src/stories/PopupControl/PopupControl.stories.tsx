import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PopupControl from './PopupControl';
import { expect } from '@storybook/jest';
import { userEvent, waitFor, within } from '@storybook/testing-library';

export default {
  title: 'PopupControl',
  component: PopupControl,
  argTypes: {
    cancelHandle: { action: 'cancel clicked' },
    okHandle: { action: 'ok clicked' },
  },

} as ComponentMeta<typeof PopupControl>;

const Template: ComponentStory<typeof PopupControl> = (args) => <PopupControl {...args} />;

export const Standart = Template.bind({});
Standart.args = {
  okLabel: 'Ok, let\'s go',
  cancelLabel: 'Not interested',
}; 

export const OkClicked = Template.bind({});
OkClicked.args = {...Standart.args};

OkClicked.play = async ({ args,canvasElement }) => {
  const canvas = within(canvasElement);
  const OkBtn = canvas.getByRole('button', {name: "Ok, let's go"});
    await userEvent.click(OkBtn);
    await waitFor(() => expect(args.okHandle).toBeCalled);
};
export const CancelClicked = Template.bind({});
CancelClicked.args = {...Standart.args};

CancelClicked.play = async ({ args,canvasElement }) => {
  const canvas = within(canvasElement);
  const OkBtn = canvas.getByRole('button', {name: "Not interested"});
    await userEvent.click(OkBtn);
    await waitFor(() => expect(args.cancelHandle).toBeCalled);
};

