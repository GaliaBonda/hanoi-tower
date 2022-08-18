import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Rod from './Rod';
import { userEvent, within, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import Stack from '../../common/utils/Stack';
import { action } from '@storybook/addon-actions';
import * as PopupStories from '../Popup/Popup.stories';



export default {
    title: 'Rod',
    component: Rod,
    argTypes: {
        moveDisc: {action: 'move disc'},
      },
    decorators: [
        (Story) => (
          <div data-testid="test-wrapper" style={{height: '50vh'}}>
            <Story />
          </div>
        ),
      ],
} as ComponentMeta<typeof Rod>;
const Template: ComponentStory<typeof Rod> = (args) => <Rod {...args} />;

export const Standart = Template.bind({});
Standart.args = {
    discsNum: 3,
    stack: new Stack([{
        width: 3,
        color: `hsla(${Math.random() * 360}, 100%, 50%)`,
        height: `calc(60% / 3)`,
        id: 0,
      },
      {
        width: 2,
        color: `hsla(${Math.random() * 360}, 100%, 50%)`,
        height: `calc(60% / 3)`,
        id: 1,
      },
      {
        width: 1,
        color: `hsla(${Math.random() * 360}, 100%, 50%)`,
        height: `calc(60% / 3)`,
        id: 2,
      }]), 
      moveDisc: action('move disc'),
};

export const CorrectDiscMove = Template.bind({});
CorrectDiscMove.args = {
    ...Standart.args
};
CorrectDiscMove.play = async ({ canvasElement }) => {
    const disc = screen.getAllByTestId('test-disc');
    await userEvent.click(disc[disc.length - 1]);
    const canvas = within(canvasElement);
    await expect(canvas.queryByText('Missed!')).toBeNull();

};
export const IncorrectDiscMove = Template.bind({});
IncorrectDiscMove.args = {
    ...Standart.args
};
IncorrectDiscMove.play = async ({ canvasElement }) => {
    const disc = screen.getAllByTestId('test-disc');
    await userEvent.click(disc[0]);
    const canvas = within(canvasElement);
    await expect(canvas.queryByText('Missed!')).toBeInTheDocument();

};
