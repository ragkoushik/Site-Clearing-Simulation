import React from 'react';
import { render, screen } from '@testing-library/react';
import Command from '../components/Command';
import reducer from '../store/reducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
const store = createStore(reducer);

describe("Command", () => {
  test('Check if command interface loads correctly', () => {
    render(<Provider store={store}><Command /></Provider>);
    expect(screen.getByText('Controls')).toBeInTheDocument();
  });

  test('Check if command text box loads correctly', () => {
    render(<Provider store={store}><Command /></Provider>);
    expect(screen.getByText('Enter commands here')).toBeInTheDocument();
  });

  test('Check if visual controls load correctly', () => {
    render(<Provider store={store}><Command /></Provider>);
    expect(screen.getByLabelText('up')).toBeInTheDocument();
    expect(screen.getByLabelText('down')).toBeInTheDocument();
    expect(screen.getByLabelText('left')).toBeInTheDocument();
    expect(screen.getByLabelText('right')).toBeInTheDocument();
  });


});
