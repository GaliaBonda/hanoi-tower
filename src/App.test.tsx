import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const testElement = screen.getByText(/Start/i);
  expect(testElement).toBeInTheDocument();
});
test('renders learn react link', () => {
  render(<App />);
  const testElement = screen.getByText(/Go/i);
  expect(testElement).not.toBeInTheDocument();
});
