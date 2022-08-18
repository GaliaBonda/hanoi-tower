import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Popup from './Popup';
import { userEvent, waitFor, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Popup',
    component: Popup,
    argTypes: {
      //  closePopup: { action: 'popup closed' },
      //  okClicked: { action: 'ok clicked' },
      //  cancelClicked: { action: 'cancel clicked' },
    }
  } as ComponentMeta<typeof Popup>;

  const Template: ComponentStory<typeof Popup> = (args) => <Popup {...args} />;

  export const Standart = Template.bind({});
  Standart.args = {
    title: 'Test Popup',
    text: 'Just testing...',
    gameControl: false,
    okLabel: 'Ok',
    cancelLabel: 'Cancel',
    backgrounColor: '#70b96a',
    okClicked: action('ok clicked'),
    cancelClicked: action('cancel clicked'),
    closePopup: action('popup closed'),
}; 

export const CancelClicked = Template.bind({});
CancelClicked.args = {...Standart.args, gameControl: true,};
CancelClicked.play = async ({ args }) => {
  await userEvent.click(screen.getByRole('button', {name: 'Cancel'}));
  await waitFor(() => expect(args.cancelClicked).toBeCalled);
};

export const OkClicked = Template.bind({});
OkClicked.args = {...Standart.args, gameControl: true,};
OkClicked.play = async ({ args }) => {
  await userEvent.click(screen.getByRole('button', {name: 'Ok'}));
  await waitFor(() => expect(args.okClicked).toBeCalled);
};

export const CloseClicked = Template.bind({});
CloseClicked.args = {...Standart.args, gameControl: true,};
CloseClicked.play = async ({ args }) => {
  await userEvent.click(screen.getByTestId('test-close-bnt'));
  await waitFor(() => expect(args.closePopup).toBeCalled);
};