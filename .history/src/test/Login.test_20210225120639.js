import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../components/loginscreen/Login';
import axios from "axios";
import Peer from '../components/loginscreen/subcomponents/Peer';
import CreateUser from '../components/loginscreen/subcomponents/CreateUser';
Enzyme.configure({ adapter: new Adapter() });



describe('Login component test', () => {

    test("expect Peer component is called at least once", () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find(Peer).length).toEqual(1);
    });

    test("expect CreateUser component is called at least once", () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find(CreateUser).length).toEqual(1);
    });


});