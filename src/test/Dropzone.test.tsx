import React from 'react';
import { render, screen } from '@testing-library/react';
import reducer from '../store/reducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Dropzone from '../components/Dropzone';
import { acceptedFileTypes } from '../utils/constants';
const store = createStore(reducer);

describe("DropZone", () => {
  test('Check if DropZone correctly', (): void => {
    render(<Provider store={store}><Dropzone filesAdded={() => {}} accept={acceptedFileTypes}/></Provider>);
    const linkElement = screen.getByText(/Upload Files/i)
    expect(linkElement).toBeInTheDocument();
  });

});
