import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Popup from './Popup';
import PopupControl from './PopupControl';

export default {
    title: 'Popup',
    component: Popup,
    
  } as ComponentMeta<typeof Popup>;

  const Template: ComponentStory<typeof Popup> = (args) => <Popup {...args} />;

  export const Standart = Template.bind({});
  Standart.args = {
    title: 'Test Popup',
    text: 'Just testing...',
    closePopup: () => alert('close popup'),
    gameControl: false,
    okLabel: 'Ok',
    cancelLabel: 'Cancel',
    backgrounColor: '#70b96a',
}; 