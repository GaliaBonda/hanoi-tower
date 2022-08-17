import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Disk from './Disk';
import { userEvent, waitFor, within, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { number } from 'prop-types';



export default {
    title: 'Disk',
    component: Disk,
    argTypes: {
        discsNum: {
            control: { type: 'range', min: 1, max: 10, step: 1 },
          },
      },
      decorators: [
        (Story) => (
          <div data-testid="test-wrapper">
            <Story />
          </div>
        ),
      ],
} as ComponentMeta<typeof Disk>;
const Template: ComponentStory<typeof Disk> = (args) => <Disk {...args} />;

export const Standart = Template.bind({});
Standart.args = {
    width: 1,
    color: 'red',
    height: '2em',
    stackId: 1, 
    discsNum: 3, 
    moveDisc: () => {},
};

export const Animated = Template.bind({});
Animated.args = {
    ...Standart.args
};
Animated.play = async () => {
    const disc = screen.getByTestId('test-disc');
    await userEvent.click(disc);

};

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

export const StopAnimated = Template.bind({});
StopAnimated.args = {
    ...Standart.args
};
StopAnimated.play = async ({ canvasElement }) => {
    const disc = screen.getByTestId('test-disc');
    await userEvent.click(disc);
    await sleep(2000);
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('test-wrapper'));
    
};