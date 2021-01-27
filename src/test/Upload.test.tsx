import React from 'react';
import { render, screen } from '@testing-library/react';
import { Upload } from '../components/Upload';
import reducer from '../store/reducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { configure, shallow } from 'enzyme';
import ReactSeventeenAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import Dropzone from '../components/Dropzone';

configure({ adapter: new ReactSeventeenAdapter() });
const store = createStore(reducer);

describe("Upload", () => {
  test('Check if Site clearing simulator loads correctly', () => {
    render(<Provider store={store}><Upload /></Provider>);
    const linkElement = screen.getByText(/Site clearing simulator loading/i)
    expect(linkElement).toBeInTheDocument();
  });

  test('Check if uploader loads correctly', () => {
    const UploadComponent = shallow(<Upload />);
    UploadComponent.setState({ timePassed: true });

    expect(UploadComponent.find(Dropzone).length).toBe(1);
  });
});
