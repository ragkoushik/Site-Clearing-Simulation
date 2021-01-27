import React from 'react';
import { render, screen } from '@testing-library/react';
import Report from '../components/Report';
import reducer from '../store/reducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { configure, mount } from 'enzyme';
import ReactSeventeenAdapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new ReactSeventeenAdapter() });

import { site } from '../../data/site';
import { actionOnUpdateBulldozerLocation, actionOnUpdateSite, actionOnUpdateFuel } from '../store/actions';
const store = createStore(reducer);

describe("Report", () => {
  test('Check if Report loads correctly', () => {
    render(<Provider store={store}><Report /></Provider>);
    expect(screen.getByText('Item')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('Cost')).toBeInTheDocument();
    expect(screen.getByText('Commands run:')).toBeInTheDocument();
    expect(screen.getByText('Communication overhead')).toBeInTheDocument();
    expect(screen.getByText('Fuel usage')).toBeInTheDocument();
    expect(screen.getByText('Destruction of protected tree')).toBeInTheDocument();
    expect(screen.getByText('Uncleared squares')).toBeInTheDocument();
    expect(screen.getByText('Damage cost')).toBeInTheDocument();
    expect(screen.getByText(/Total cost/i)).toBeInTheDocument();
  });

  test('Check if costs and quantity correctly', () => {
    const props = {
      site: site,
      fuel: 1,
      bulldozer: {
        xPos: 0,
        yPos: 0,
        facing: "EAST",
        damage: 0
      }
    }

    store.dispatch(actionOnUpdateSite(props.site));
    store.dispatch(actionOnUpdateFuel(props.fuel));
    store.dispatch(actionOnUpdateBulldozerLocation(props.bulldozer, 'advance 1'));

    const wrapper = mount(<Provider store={store}><Report /></Provider>);
    // Commands run
    expect(wrapper.find('p').at(0).text()).toEqual("Commands run: advance 1");

    // Communication overhead
    expect(wrapper.find('td').at(0).text()).toEqual("1");
    expect(wrapper.find('td').at(1).text()).toEqual("1");
    // Fuel usage
    expect(wrapper.find('td').at(2).text()).toEqual("1");
    expect(wrapper.find('td').at(3).text()).toEqual("1");
    // Destruction of protected tree
    expect(wrapper.find('td').at(4).text()).toEqual("0");
    expect(wrapper.find('td').at(5).text()).toEqual("0");
    // Uncleared squares
    expect(wrapper.find('td').at(6).text()).toEqual("14");
    expect(wrapper.find('td').at(7).text()).toEqual("42");
    //Damage cost
    expect(wrapper.find('td').at(8).text()).toEqual("0");
    expect(wrapper.find('td').at(9).text()).toEqual("0");

    // total cost
    expect(wrapper.find('p').at(1).text()).toEqual("Total cost: 44");
  });
});
