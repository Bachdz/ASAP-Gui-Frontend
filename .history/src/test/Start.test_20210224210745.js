import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Start from '../components/startscreen/Start';
import { ReactComponent as Arrow } from '../arrow.svg';
import axios from "axios";

Enzyme.configure({ adapter: new Adapter() });

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

});

