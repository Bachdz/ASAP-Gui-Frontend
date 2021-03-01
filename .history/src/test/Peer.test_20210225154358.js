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

    it('Test props rendering', () => {
        const wrapper = shallow(<Peer peers={["testpeer1,testpeer2"]} />);
        expect(wrapper.props.peer).toEqual(2);
    })

});