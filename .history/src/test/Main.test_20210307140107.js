import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { unWrappedMain as Main } from '../components/dashboard/Main';
import Snackbar from '@material-ui/core/Snackbar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Apps from '../components/dashboard/subcomponents/Apps';
import Messages from '../components/dashboard/subcomponents/Messages';
import Connection from '../components/dashboard/subcomponents/Connection';
import Terminal from '../components/fragments/Terminal';
import SockJsClient from 'react-stomp';

Enzyme.configure({ adapter: new Adapter() });

describe('Main component test', () => {
    /* 
    *   Test the main component render the exact element, if no information about
    *   user is provived. Redirect-Elemente of react-router-dom should be rendered.
    */
    it("will be redirected to /login route if user was not chosen a peer ", () => {
        //using enzyme to shallow the component 
        const wrapper = shallow(<Main />)
        expect(wrapper.find('Redirect').length).toEqual(1);
        expect(wrapper.find('.main').length).toEqual(0);
        expect(wrapper.find('Redirect').props().to).toEqual('/login');
    });


    it("will be render the .main-div if information about user is provied ", () => {
        const mockLocation = { state: { peer: "testPeer" } };
        const wrapper = shallow(<Main location={mockLocation} />)
        expect(wrapper.find('Redirect').length).toEqual(0);
        expect(wrapper.find('.main').length).toEqual(1);
    });

    it("has Snackbar component for showing information", () => {
        //prepare mock data for redering
        const mockLocation = { state: { peer: "testPeer" } };
        const wrapper = shallow(<Main location={mockLocation} />)
        expect(wrapper.find(Snackbar).length).toEqual(1);
    });


    it("has navigation section for showing information", () => {
        //prepare mock data for class 
        const mockLocation = { state: { peer: "testPeer" } };
        const wrapper = shallow(<Main location={mockLocation} />)

        //has navigation section
        expect(wrapper.find(".navigation").length).toEqual(1);

        //Navigation contains welcome line
        expect(wrapper.find(".user-info").text()).toBe('Welcome testPeer');

        //expect logout button
        expect(wrapper.find(ExitToAppIcon).length).toEqual(1);
        expect(wrapper.find('Link').props().to).toEqual('/login');
    });

    it("has App component mounted", () => {
        //prepare mock data for class 
        const mockLocation = { state: { peer: "testPeer" } };
        const wrapper = shallow(<Main location={mockLocation} />)
        expect(wrapper.find(Apps).length).toEqual(1);
    });



    it("doesn't mount Messages component if channel and app is not selected", () => {
        //prepare mock data for class 
        const mockLocation = { state: { peer: "testPeer" } };
        const wrapper = shallow(<Main location={mockLocation} />)
        expect(wrapper.find(Messages).length).toEqual(0);
    });

    it("mount Messages component if channel and app is not selected", () => {
        //prepare mock data for class 
        const mockLocation = { state: { peer: "testPeer" } };
        const wrapper = shallow(<Main location={mockLocation} />)

        //mock state 
        wrapper.setState({ channelSelected: true, appSelected: true })
        expect(wrapper.find(Messages).length).toEqual(1);
    });



    it("has Connection component mounted", () => {
        //prepare mock data for class 
        const mockLocation = { state: { peer: "testPeer" } };
        const wrapper = shallow(<Main location={mockLocation} />)

        expect(wrapper.find(Connection).length).toEqual(1);
    });


    it("has Websocket component ", () => {
        //prepare mock data for class 
        const mockLocation = { state: { peer: "testPeer" } };
        const wrapper = shallow(<Main location={mockLocation} />)
        const websocket = wrapper.find(SockJsClient)
        expect(websocket.length).toEqual(1);
        expect(websocket.props().url).toEqual("http://localhost:8080/websocket/");
        expect(websocket.props().topics).toEqual(['/received/user']);
    });


    it("has Terminal component ", () => {
        //prepare mock data for class 
        const mockLocation = { state: { peer: "testPeer" } };
        const wrapper = shallow(<Main location={mockLocation} />)
        expect(wrapper.find(Terminal).length).toEqual(1);

    });
});