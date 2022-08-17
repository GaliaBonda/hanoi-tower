import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GameField from './GameField';
import { userEvent, within, screen, fireEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';



export default {
    title: 'GameField',
    component: GameField,
    decorators: [
        (Story) => (
          <div data-testid="test-wrapper" style={{width: '100%'}}>
            <Story />
          </div>
        ),
      ],
} as ComponentMeta<typeof GameField>;
const Template: ComponentStory<typeof GameField> = () => <GameField  />;

export const Standart = Template.bind({});
Standart.args = {
};

export const FiveDiscsGame = Template.bind({});
FiveDiscsGame.args = {
    ...Standart.args
};
FiveDiscsGame.play = async () => {
    const input = screen.getByRole('textbox');
    await userEvent.type(input, '5');
    const startButton = screen.getByRole('button', {name: 'Start'});
    await userEvent.click(startButton);
    const disc = screen.getAllByTestId('test-disc');
    await expect(disc.length).toEqual(5);
};
export const TenDiscsGame = Template.bind({});
TenDiscsGame.args = {
    ...Standart.args
};
TenDiscsGame.play = async () => {
    const input = screen.getByRole('textbox');
    await userEvent.type(input, '10');
    const startButton = screen.getByRole('button', {name: 'Start'});
    await userEvent.click(startButton);
    const disc = screen.getAllByTestId('test-disc');
    await expect(disc.length).toEqual(10);
};

export const ElevenDiscsGame = Template.bind({});
ElevenDiscsGame.args = {
    ...Standart.args
};
ElevenDiscsGame.play = async ({ canvasElement }) => {
    const input = screen.getByRole('textbox');
    await userEvent.type(input, '11');
    const canvas = within(canvasElement);
    await expect(canvas.queryByText('Invalid discs amount!')).toBeInTheDocument();
};

export const TopDiscMoved = Template.bind({});
TopDiscMoved.args = {
    ...Standart.args
};
TopDiscMoved.play = async () => {
    const disc = screen.getAllByTestId('test-disc');
    const topDisc = disc[disc.length - 1];
    await userEvent.click(topDisc);
    const secondRod = screen.getAllByTestId('test-rod')[1];
    const xCoord = secondRod.getBoundingClientRect().x;
    const rodWrapper = screen.getByTestId('test-stacks-wrapper');
    await userEvent.click(rodWrapper, {clientX: xCoord});
    await expect(within(secondRod).queryByTestId('test-disc')).not.toBeNull();
};

