import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Peer from '../components/loginscreen/subcomponents/Peer';

import { ReactComponent as Arrow } from '../arrow.svg';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
// import { MemoryRouter } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

describe('Peer component test', () => {

    it('props rendering', () => {
        let expectedArray = ["testpeer1,testpeer2"];

        const wrapper = shallow(<Peer peers={["testpeer1,testpeer2"]} />);
        expect(wrapper.props.peers).toBeTruthy;
        expect(wrapper.find('.peer-container')).toBeTruthy;

    })

    it('render same amount of peers as in the props', () => {

        const wrapper = shallow(<Peer peers={["testpeer1"]} />);
        expect(wrapper.props.peers).toBeTruthy;

        expect(wrapper.find('#peer')).toHaveLength(2);

    })

});