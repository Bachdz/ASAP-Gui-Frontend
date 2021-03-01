import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Start from '../components/startscreen/Start';
import { ReactComponent as Arrow } from '../arrow.svg';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
// import { MemoryRouter } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });
const doInitializeApp = jest.fn();




describe('Start component test', () => {

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
        const mock = new MockAdapter(axios);
        mock.onGet("http://localhost:8080/api/v1/asap/start").reply(200, true);
        const mProps = { history: { push: jest.fn() } };
        const wrapper = shallow(<Start {...mProps} />);
        const arrow = wrapper.find(Arrow);
        // const axiosSpy = jest.spyOn(axios, 'get');
        // axios.get.mockResolvedValue({ data: true });
        arrow.simulate('click');
        // expect(axiosSpy).toHaveBeenCalled();
        expect(mProps.history.push).toBeCalledWith('/login');


        // })
        // it('expect callback function to be called on click', () => {
        //     const wrapper = shallow(<Start />);
        //     const arrow = wrapper.find(Arrow);
        //     arrow.simulate('click');
        //     expect(doInitializeApp).toHaveBeenCalled();
        // })

    });

});