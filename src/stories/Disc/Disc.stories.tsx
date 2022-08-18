import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Disc from './Disc';
import { userEvent, within } from '@storybook/testing-library';

export default {
  title: 'Disc',
  component: Disc,
  argTypes: {
    moveDisc: { action: 'move disc', table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div data-testid='test-wrapper'>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Disc>;
const Template: ComponentStory<typeof Disc> = (args) => <Disc {...args} />;

export const Standart = Template.bind({});
Standart.args = {
  width: 1,
  color: 'red',
  height: '2em',
  stackId: 1,
  discsNum: 3,
  animatedState: false,
  id: 0,
};

export const Animated = Template.bind({});
Animated.args = {
  ...Standart.args,
};
Animated.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const disc = canvas.getByTestId('test-disc');
  await userEvent.click(disc);
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const StopAnimated = Template.bind({});
StopAnimated.args = {
  ...Standart.args,
};
StopAnimated.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const disc = canvas.getByTestId('test-disc');
  await userEvent.click(disc);
  await sleep(2000);
  await userEvent.click(canvas.getByTestId('test-wrapper'));
};

export const WithStateAnimated = Template.bind({});
WithStateAnimated.args = { ...Standart.args, animatedState: true };
