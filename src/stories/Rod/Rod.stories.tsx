import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Rod from './Rod';
import { userEvent, within, screen, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import formStacks from '../../common/utils/formStacks';

export default {
  title: 'Rod',
  component: Rod,
  argTypes: {
    moveDisc: { action: 'move disc' },
  },
  decorators: [
    (Story) => (
      <div data-testid="test-wrapper" style={{ height: '50vh' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Rod>;
const Template: ComponentStory<typeof Rod> = (args) => <Rod {...args} />;

export const Standart = Template.bind({});
Standart.args = {
  discsNum: 3,
  stack: formStacks(3).stack1.stack,
};

export const FiveDiscsRod = Template.bind({});
FiveDiscsRod.args = {
  discsNum: 5,
  stack: formStacks(5).stack1.stack,
}

export const CorrectDiscMove = Template.bind({});
CorrectDiscMove.args = {
  ...Standart.args
};
CorrectDiscMove.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const disc = canvas.getAllByTestId('test-disc');
  await userEvent.click(disc[disc.length - 1]);
  await expect(canvas.queryByText('Missed!')).toBeNull();
  await waitFor(() => expect(args.moveDisc).toBeCalled);
};
export const IncorrectDiscMove = Template.bind({});
IncorrectDiscMove.args = {
  ...Standart.args
};
IncorrectDiscMove.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const disc = canvas.getAllByTestId('test-disc');
  await userEvent.click(disc[0]);
  await expect(canvas.queryByText('Missed!')).toBeInTheDocument();

};

export const WithPopup = Template.bind({});
WithPopup.args = { ...Standart.args, warningPopup: true };
