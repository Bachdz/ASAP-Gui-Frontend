import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../components/loginscreen/Login';
import axios from "axios";
import Peer from '../components/loginscreen/subcomponents/Peer';
import CreateUser from '../components/loginscreen/subcomponents/CreateUser';
import MockAdapter from "axios-mock-adapter";

Enzyme.configure({ adapter: new Adapter() });



describe('Login component test', () => {
    beforeEach(() => {
        var mock = new MockAdapter(axios);
        mock.onAny("http://localhost:8080/api/v1/asap/peers").reply(200, ["testpeer1", "testpeer2"]);
    });

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

});