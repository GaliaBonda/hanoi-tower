import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GameField from './GameField';
import { userEvent, within, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';



export default {
  title: 'GameField',
  component: GameField,
  decorators: [
    (Story) => (
      <div data-testid="test-wrapper" style={{ width: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof GameField>;
const Template: ComponentStory<typeof GameField> = () => <GameField />;

export const Standart = Template.bind({});
Standart.args = {
};

export const FiveDiscsGame = Template.bind({});

FiveDiscsGame.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByRole('textbox');
  await userEvent.type(input, '5');
  const startButton = canvas.getByRole('button', { name: 'Start' });
  await userEvent.click(startButton);
  const disc = canvas.getAllByTestId('test-disc');
  await expect(disc.length).toEqual(5);
};

export const TenDiscsGame = Template.bind({});
TenDiscsGame.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByRole('textbox');
  await userEvent.type(input, '10');
  const startButton = canvas.getByRole('button', { name: 'Start' });
  await userEvent.click(startButton);
  const disc = canvas.getAllByTestId('test-disc');
  await expect(disc.length).toEqual(10);
};

export const ElevenDiscsGame = Template.bind({});

ElevenDiscsGame.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByRole('textbox');
  await userEvent.type(input, '11');
  await expect(canvas.queryByText('Invalid discs amount!')).toBeInTheDocument();
};

export const TopDiscMoved = Template.bind({});
TopDiscMoved.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const disc = canvas.getAllByTestId('test-disc');
  const topDisc = disc[disc.length - 1];
  await userEvent.click(topDisc);
  const secondRod = canvas.getAllByTestId('test-rod')[1];
  const xCoord = secondRod.getBoundingClientRect().x;
  const rodWrapper = canvas.getByTestId('test-stacks-wrapper');
  await userEvent.click(rodWrapper, { clientX: xCoord });
  await expect(within(secondRod).queryByTestId('test-disc')).not.toBeNull();
};

