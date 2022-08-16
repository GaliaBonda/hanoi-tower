import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PopupControl from './PopupControl';

export default {
  title: 'PopupControl',
  component: PopupControl,
  argTypes: {
    backgroundColor: { control: 'color' },
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