import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from '../components/dashboard/Main';
import { Redirect, MemoryRouter, Router } from 'react-router-dom';
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { SnackbarProvider } from 'notistack';

Enzyme.configure({ adapter: new Adapter() });

describe('Main component test', () => {

    it('consists Redirect if no peer is passt in location state', () => {
        const wrapper = shallow(<Main />);
        expect(wrapper.find(Redirect)).toBeTruthy;
    });


    it("renders location state", () => {
        const history = createMemoryHistory();
        const state = { peer: "testpeer" }
        history.push("/main/user", state);

        const { getByText } = render(
            <SnackbarProvider>
                <Router history={history}>
                    <Main />
                </Router>
            </SnackbarProvider>
        );
        getByText(state.peer);

    });

});