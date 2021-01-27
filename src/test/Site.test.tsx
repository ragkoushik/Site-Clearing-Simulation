import React from 'react';
import { render, screen } from '@testing-library/react';
import Site from '../components/Site';
import reducer from '../store/reducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { configure, mount } from 'enzyme';
import ReactSeventeenAdapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new ReactSeventeenAdapter() });

import { site } from '../../data/site';
import { actionOnUpdateBulldozerLocation, actionOnUpdateSite, actionOnUpdateFuel } from '../store/actions';
const store = createStore(reducer);

describe("Site", () => {
  test('Check if site loads properly', () => {
    const props = {
      site: site,
      bulldozer: {
        xPos: 0,
        yPos: 0,
        facing: "EAST",
        damage: 0
      }
    }

    store.dispatch(actionOnUpdateSite(props.site));
    store.dispatch(actionOnUpdateBulldozerLocation(props.bulldozer, 'advance 1'));

    const wrapper = mount(<Provider store={store}><Site /></Provider>);
    // Site dimentions - for a 5 * 10
    expect(wrapper.find('tr').length).toEqual(5);
    expect(wrapper.find('td').length).toEqual(50);
  });
});
