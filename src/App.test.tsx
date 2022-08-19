import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import GameInput from './components/GameInput/GameInput';

test('check for start button', () => {
  render(<App />);
  const testElement = screen.getByText(/Start/i);
  expect(testElement).toBeInTheDocument();
});

const setup = () => {
  const utils = render(<App />);
  const input = utils.getByLabelText('How many discs?');
  return {
    input,
    ...utils,
  };
};

test('changing number of discs test', () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: '10' } });
  expect((input as HTMLInputElement).value).toBe('10');
  const startButton = screen.getByText(/Start/i);
  fireEvent.click(startButton);
  const discs = screen.getAllByTestId('test-disc');
  expect(discs.length).toEqual(10);
});

test('incorrect discs number, popup check', () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: '11' } });
  expect((input as HTMLInputElement).value).not.toBe('11');
  expect(screen.getByText('Invalid discs amount!')).toBeInTheDocument;

  fireEvent.change(input, { target: { value: 'aaa' } });
  expect((input as HTMLInputElement).value).not.toBe('aaa');
  expect(screen.getByText('Invalid discs amount!')).toBeInTheDocument;
});

test('top disc moved', () => {
  render(<App />);
  const discs = screen.getAllByTestId('test-disc');
  fireEvent.click(discs[discs.length - 1]);
  expect(screen.queryByTestId('Missed!')).toBeNull;
  const rodsWrapper = screen.getByTestId('test-rods-wrapper');
  const secondRod = screen.getAllByTestId('test-rod')[1];
  const xCoord = secondRod.getBoundingClientRect().x;
  fireEvent.click(rodsWrapper, { clientX: xCoord });
  expect(within(secondRod).queryByTestId('test-disc')).toBe;
});

test("bottom disc doesn't move", () => {
  render(<App />);
  const discs = screen.getAllByTestId('test-disc');
  fireEvent.click(discs[0]);
  expect(screen.queryByTestId('Missed!')).toBeInTheDocument;
});

test('change callback handler', async () => {
  const onChange = jest.fn();
  render(<GameInput value={0} handleChange={onChange} formStacks={() => {}} />);
  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: '10' },
  });
  expect(onChange).toHaveBeenCalledTimes(1);
});
