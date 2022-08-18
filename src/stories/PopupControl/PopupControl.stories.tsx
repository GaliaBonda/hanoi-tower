import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PopupControl from './PopupControl';
import { action } from '@storybook/addon-actions';

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
  cancelHandle: action('cancel clicked'),
  okHandle: action('ok clicked'),
  okLabel: 'Ok, let\'s go',
  cancelLabel: 'Not interested',
}; 
