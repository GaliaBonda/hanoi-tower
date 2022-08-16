import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PopupControl from './PopupControl';
import { userEvent, waitFor, within } from '@storybook/testing-library';

export default {
  title: 'PopupControl',
  component: PopupControl,
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: { action: 'clicked' },
  },

} as ComponentMeta<typeof PopupControl>;

const Template: ComponentStory<typeof PopupControl> = (args) => <PopupControl {...args} />;

export const Standart = Template.bind({});
Standart.args = {
  cancelHandle: () => alert('cancel clicked'),
  okHandle: () => alert('ok clicked'),
  okLabel: 'Ok, let\'s go',
cancelLabel: 'Not interested',
}; 

export const Clicked = Template.bind({});

Clicked.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByRole('button', {description: 'Ok. let\'s go'}));

  await waitFor(() => expect(args.onClick).toHaveBeenCalled());
};

// Clicked.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);
//   const OkButton = await canvas.getByRole('button');
//   await userEvent.click(OkButton);
// };