import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from '../components/dashboard/Main';
import { Redirect, MemoryRouter, Route } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';


Enzyme.configure({ adapter: new Adapter() });

describe('Main component test', () => {

    it('consists Redirect', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={[`/main/user`]}>
                <Route component={Main} />
            </MemoryRouter>
        );


        expect(wrapper.find(Main).props().location.pathname).toBe("/login");
    });



});