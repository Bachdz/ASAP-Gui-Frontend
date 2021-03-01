import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Start from '../components/startscreen/Start';
import { ReactComponent as Arrow } from '../arrow.svg';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));


describe('Start', () => {
    it('test component contains arrow element', () => {
        const wrapper = shallow(<Start />);
        expect(wrapper.find(Arrow)).toHaveLength(1);
    })

    it('test component contains welcome line', () => {
        const wrapper = shallow(<Start />);
        const text = wrapper.find('#box');
        expect(text.text()).toBe('Welcome to ASAP engine');
    })

    it('test axios get is called by clicking the arrow', () => {
        const axiosSpy = jest.spyOn(axios, 'get');
        const wrapper = shallow(<Start />);
        const arrow = wrapper.find(Arrow);
        arrow.simulate('click');
        expect(axiosSpy).toHaveBeenCalled();
    })

    it('test axios get reroute the application to path /login', () => {
        const wrapper = shallow(<Start />);
        const arrow = wrapper.find(Arrow);

        const mock = new MockAdapter(axios);

        mock.onGet("http://localhost:8080/api/v1/asap/start").reply(200, true);

        arrow.simulate('click');
        expect(mockHistoryPush).toHaveBeenCalledWith('/login');



    })


});

