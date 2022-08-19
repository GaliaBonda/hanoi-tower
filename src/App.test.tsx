import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import App from './App';
import GameInput from './components/GameInput/GameInput';
import Popup from './components/Popup/Popup';
import Disc from './components/Disc/Disc';

afterEach(cleanup);

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
  expect(screen.getByText('Invalid discs amount!')).toBeInTheDocument();

  fireEvent.change(input, { target: { value: 'aaa' } });
  expect((input as HTMLInputElement).value).not.toBe('aaa');
  expect(screen.getByText('Invalid discs amount!')).toBeInTheDocument();
});

test('top disc moved', () => {
  render(<App />);
  const discs = screen.getAllByTestId('test-disc');
  fireEvent.click(discs[discs.length - 1]);
  expect(screen.queryByTestId('Missed!')).toBeNull;
  const rodsWrapper = screen.getByTestId('test-rods-wrapper');
  const secondRod = screen.getAllByTestId('test-rod')[1];

  fireEvent.click(rodsWrapper, { clientX: window.innerWidth / 2 });
  expect(within(secondRod).findByTestId('test-disc')).not.toBeNull();
  screen.debug();
});

test("bottom disc doesn't move", () => {
  render(<App />);
  const discs = screen.getAllByTestId('test-disc');
  fireEvent.click(discs[0]);
  expect(screen.queryByText('Missed!')).toBeInTheDocument();
});

test('bigger disc placed on smaller disc', () => {
  render(<App />);
  const discs = screen.getAllByTestId('test-disc');
  fireEvent.click(discs[discs.length - 1]);
  const rodsWrapper = screen.getByTestId('test-rods-wrapper');
  fireEvent.click(rodsWrapper, { clientX: window.innerWidth / 2 });
  fireEvent.click(discs[1]);
  fireEvent.click(rodsWrapper, { clientX: window.innerWidth / 2 });
  expect(screen.queryByText('Too big!')).not.toBeNull();
});

test('gameinput callbacks', async () => {
  const onChange = jest.fn();
  const formStacksCallback = jest.fn();
  render(
    <GameInput
      value={0}
      handleChange={onChange}
      formStacks={formStacksCallback}
    />
  );
  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: '10' },
  });
  fireEvent.click(screen.getByText('Start'));
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(formStacksCallback).toHaveBeenCalledTimes(1);
});

test('popup closing/controlling', async () => {
  const onCloseClick = jest.fn();
  const onOkClick = jest.fn();
  render(
    <Popup
      title='Test popup'
      text='Testing popup'
      closePopup={onCloseClick}
      gameControl={true}
      okHandle={onOkClick}
    />
  );
  fireEvent.click(screen.getByRole('button', { name: 'Close' }));
  fireEvent.click(screen.getByRole('button', { name: 'Not interested' }));
  expect(onCloseClick).toHaveBeenCalledTimes(2);
  fireEvent.click(screen.getByRole('button', { name: "Ok, let's go" }));
  expect(onOkClick).toHaveBeenCalledTimes(1);
});

test('animation launch and stop', () => {
  render(<App />);
  const topDisc = screen.getAllByTestId('test-disc')[0];
  fireEvent.click(topDisc);
  expect(topDisc).not.toHaveStyle('animation: 1s linear infinite;');
  const rodsWrapper = screen.getByTestId('test-rods-wrapper');
  fireEvent.click(rodsWrapper);
  expect(topDisc).toHaveStyle('animation: 1s linear infinite;');
});

test('win game, win popup', () => {
  render(<App />);
  const input = screen.getByLabelText('How many discs?');
  fireEvent.change(input, { target: { value: '1' } });
  const startButton = screen.getByText(/Start/i);
  fireEvent.click(startButton);
  const disc = screen.getByTestId('test-disc');
  fireEvent.click(disc);
  const rodsWrapper = screen.getByTestId('test-rods-wrapper');
  const secondRod = screen.getAllByTestId('test-rod')[2];
  fireEvent.click(rodsWrapper, { clientX: window.innerWidth / 2 });
  expect(within(secondRod).queryByTestId('test-disc')).not.toBeNull();
  expect(screen.queryByText('Congratulations!!!')).not.toBeNull();
});

test('responsive width of discs and rods', () => {
  render(<App />);
  const input = screen.getByLabelText('How many discs?');
  const disc = screen.getAllByTestId('test-disc')[1];
  const startDiscWidth = getComputedStyle(disc).getPropertyValue('width');
  const rod = screen.getAllByTestId('test-inner-rod')[0];
  const startRodWidth = getComputedStyle(rod).getPropertyValue('width');
  fireEvent.change(input, { target: { value: '10' } });
  const startButton = screen.getByText(/Start/i);
  fireEvent.click(startButton);
  const newDiscWidth = getComputedStyle(
    screen.getAllByTestId('test-disc')[1]
  ).getPropertyValue('width');
  const newRodWidth = getComputedStyle(rod).getPropertyValue('width');
  expect(startDiscWidth).not.toEqual(newDiscWidth);
  expect(startRodWidth).not.toEqual(newRodWidth);
});
