import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Peer from '../components/loginscreen/subcomponents/Peer';
import Arrow from '@material-ui/icons/ArrowForward';
import { MemoryRouter, Link } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

describe('Peer component test', () => {

    it('props rendering', () => {
        let expectedArray = ["testpeer1,testpeer2"];

        const wrapper = shallow(<Peer peers={["testpeer1", "testpeer2"]} />);
        expect(wrapper.props.peers).toBeTruthy;
        expect(wrapper.find('.peer-container')).toBeTruthy;

    })

    it('render same amount of peers as in the props', () => {

        const wrapper = shallow(<Peer peers={["testpeer1", "testpeer2"]} />);
        expect(wrapper.props.peers).toBeTruthy;

        expect(wrapper.find('#peer')).toHaveLength(2);
        expect(wrapper.find(Arrow)).toHaveLength(2);
    });

    it('includes link to dashboard component', () => {
        let expectedState = { peer: "testpeer1" }
        const wrapper = shallow(<Peer peers={["testpeer1"]} />);


        //expect the Link path is to main dashboard
        expect(wrapper.find(Link).props().to.pathname).toBe('/main/user');


        //expect the Link path send the state with peername to main dashboard
        expect(wrapper.find(Link).props().to.state).toEqual(expectedState);
    });

});