import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Popup from './Popup';
import PopupControl from './PopupControl';
import { userEvent, waitFor, within, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
    title: 'Popup',
    component: Popup,
    argTypes: {
       onClick: { action: 'clicked' },
    }
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

export const CancelClicked = Template.bind({});

CancelClicked.play = async ({ args, canvasElement }) => {
  // const canvas = within(canvasElement);

  await userEvent.click(screen.getByRole('button', {name: 'Cancel'}));

  // await expect(
  //   canvas.getByText(
  //     'cancel clicked'
  //   )
  // ).toBeInTheDocument();

  await waitFor(() => expect(args.onClick).toBeCalled);
};

export const OkClicked = Template.bind({});
OkClicked.play = async ({ args, canvasElement }) => {
  await userEvent.click(screen.getByRole('button', {name: 'Ok'}));
  await waitFor(() => expect(args.onClick).toBeCalled);
};

export const CloseClicked = Template.bind({});
CloseClicked.play = async ({ args, canvasElement }) => {
  await userEvent.click(screen.getByTestId('test-close-bnt'));
  await waitFor(() => expect(args.onClick).toBeCalled);
};