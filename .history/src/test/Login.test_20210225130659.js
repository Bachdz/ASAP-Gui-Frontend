import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../components/loginscreen/Login';
import axios from "axios";
import Peer from '../components/loginscreen/subcomponents/Peer';
import CreateUser from '../components/loginscreen/subcomponents/CreateUser';
// import MockAdapter from "axios-mock-adapter";

Enzyme.configure({ adapter: new Adapter() });

jest.mock('axios');

describe('Login component test', () => {
    beforeEach(() => {
        const data = ["testpeer1", "testpeer2"];
        axios.get.mockResolvedValue({ data: data });
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    test("expect Peer component is called at least once", () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find(Peer).length).toEqual(1);
    });

    test("expect CreateUser component is called at least once", () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find(CreateUser).length).toEqual(1);
    });


    test("expect CreateUser component is called at least once", () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find(CreateUser).length).toEqual(1);
    });

    test("expect getPeers() function is called in componentDidMount()", () => {
        const axiosSpy = jest.spyOn(axios, 'get');
        const wrapper = shallow(<Login />);
        wrapper.instance().componentDidMount();
        expect(axiosSpy).toHaveBeenCalled();
    });

    test("expect state peers array has right input", () => {
        const data = ["testpeer1", "testpeer2"];

        const axiosSpy = jest.spyOn(axios, 'get');
        const wrapper = shallow(<Login />);
        wrapper.instance().componentDidMount();
        expect(axiosSpy).toHaveBeenCalled();
        expect(wrapper.state().peers).toBe(data);
    });

});