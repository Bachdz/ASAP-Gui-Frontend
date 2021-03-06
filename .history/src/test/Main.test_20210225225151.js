import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { unWrappedMain as Main } from '../components/dashboard/Main';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';




Enzyme.configure({ adapter: new Adapter() });

describe('Main component test', () => {
    /* intergration test */
    it("will be redirected to /login route if user was not chosen a peer ", () => {
        const wrapper = shallow(<Main />)
        expect(wrapper.find('Redirect').length).toEqual(1);
        expect(wrapper.find('Redirect').props().to).toEqual('/login');

    });
    it("has Snackbar component for showing information", () => {
        //prepare mock data for class 
        const mockLocation = { state: { peer: "testPeer" } };
        const wrapper = shallow(<Main location={mockLocation} />)
        expect(wrapper.find(Snackbar).length).toEqual(1);
    });


    it("has navigation component for showing information", () => {
        //prepare mock data for class 
        const mockLocation = { state: { peer: "testPeer" } };
        const wrapper = shallow(<Main location={mockLocation} />)

        //has navigation section
        expect(wrapper.find(".navigation").length).toEqual(1);

        //Navigation contains welcome line
        expect(wrapper.find(".user-info").text()).toBe('Welcome testPeer');

        //expect logout button
        expect(wrapper.find(Link).props().to).toEqual('/login');

    });
});