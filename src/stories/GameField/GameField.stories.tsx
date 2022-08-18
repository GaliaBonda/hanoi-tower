import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GameField from './GameField';
import { userEvent, within } from '@storybook/testing-library';
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

export const BottomDiscMoved = Template.bind({});
BottomDiscMoved.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const disc = canvas.getAllByTestId('test-disc');
  const bottomDisc = disc[0];
  await userEvent.click(bottomDisc);
  await expect(canvas.getByText('Missed!')).toBeInTheDocument();
};

export const SecondDiscMoved = Template.bind({});
SecondDiscMoved.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const disc = canvas.getAllByTestId('test-disc');
  const secondDisc = disc[1];
  await userEvent.click(secondDisc);
  await expect(canvas.getByText('Missed!')).toBeInTheDocument();
};

export const TwoDiscsOnSecondRod = Template.bind({});
TwoDiscsOnSecondRod.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  let disc = canvas.getAllByTestId('test-disc');
  let topDisc = disc[disc.length - 1];
  await userEvent.click(topDisc);

  const secondRod = canvas.getAllByTestId('test-rod')[1];
  const xCoord = secondRod.getBoundingClientRect().x;
  const rodWrapper = canvas.getByTestId('test-stacks-wrapper');
  await userEvent.click(rodWrapper, { clientX: xCoord });

  const secondDisc = disc[disc.length - 2];
  await userEvent.click(secondDisc);

  const x1Coord = secondRod.getBoundingClientRect().x + 1.5 * secondRod.getBoundingClientRect().width;
  await userEvent.click(rodWrapper, { clientX: x1Coord });
  disc = canvas.getAllByTestId('test-disc');
  topDisc = disc[1];
  await userEvent.click(topDisc);
  await userEvent.click(rodWrapper, { clientX: x1Coord });
  await expect(within(secondRod).queryByTestId('test-disc')).toBeNull();
  const thirdRod = canvas.getAllByTestId('test-rod')[2];
  await expect(within(thirdRod).queryAllByTestId('test-disc').length).toEqual(2);
};