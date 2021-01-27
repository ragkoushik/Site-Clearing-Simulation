import React from 'react';
import { render, screen } from '@testing-library/react';
import Bulldozer from '../components/Bulldozer';
import reducer from '../store/reducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
const store = createStore(reducer);

describe("Bolldozer", () => {
  test('Check if bulldozer loads correctly', () => {
    render(<Provider store={store}><Bulldozer /></Provider>);
    const linkElement = screen.getByAltText(/bulldozer/i)
    expect(linkElement).toBeInTheDocument();
  });
});
