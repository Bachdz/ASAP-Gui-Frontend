import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from '../components/dashboard/Main';
import { Redirect, MemoryRouter, Route } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import Login from '../components/loginscreen/Login';


Enzyme.configure({ adapter: new Adapter() });

describe('Main component test', () => {

    it('consists Redirect', () => {
        const wrapper = shallow(<Main />);
        expect(wrapper.find(Login)).toHaveLength(1);
    });



});