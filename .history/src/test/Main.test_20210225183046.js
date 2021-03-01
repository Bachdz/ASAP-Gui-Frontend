import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from '../components/dashboard/Main';
import { Redirect, MemoryRouter, Route } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';


Enzyme.configure({ adapter: new Adapter() });

describe('Main component test', () => {

    it('consists Redirect', () => {
        const wrapper = shallow(<Main />);

        //   expect(privateRoute.find('Router').prop('history').location.pathname).toEqual('/login')
        // expect(wrapper.find(Main).props().location.pathname).toBe("/login");
        expect(wrapper.containsMatchingElement(<Redirect to="/login" />)).toEqual(true)
    });



});