import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Simulator from '../components/Simulator';
import reducer from '../store/reducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { configure, mount } from 'enzyme';
import ReactSeventeenAdapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new ReactSeventeenAdapter() });

import { site } from '../../data/site';
import { actionOnUpdateBulldozerLocation, actionOnUpdateSite, actionOnUpdateFuel, actionOnBulldozerError } from '../store/actions';
import Site from '../components/Site';
import Command from '../components/Command';
const store = createStore(reducer);

describe("Simulator", () => {
  test('Simulator doesn\'t load because site is not defined', () => {
    const props = {
      site: [],
      bulldozer: {
        xPos: -1,
        yPos: -1,
        facing: "EAST",
        damage: 0
      }
    }

    store.dispatch(actionOnUpdateSite(props.site));

    const wrapper = mount(<Provider store={store}><Router><Simulator /></Router></Provider>);
    expect(wrapper.find('label').length).toEqual(0);
  });

  test('Simulator loads now that site is defined', () => {
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

    const wrapper = mount(<Provider store={store}><Simulator /></Provider>);
    expect(wrapper.find(Site).length).toBe(1);
    expect(wrapper.find(Command).length).toBe(1);
  });

  test('check if simulator error pop up shows up', () => {
    const props = {
      site: site,
      bulldozer: {
        xPos: 0,
        yPos: 0,
        facing: "EAST",
        damage: 0
      },
      error: 'The simulation has ended at your request'
    }

    store.dispatch(actionOnUpdateSite(props.site));
    store.dispatch(actionOnUpdateBulldozerLocation(props.bulldozer, 'advance 1'));

    store.dispatch(actionOnBulldozerError(props.error));

    const wrapper = mount(<Provider store={store}><Simulator /></Provider>);
    expect(wrapper.find('h2').text()).toEqual('Simulator ended');
  });
});
