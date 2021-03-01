import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateUser from '../components/loginscreen/subcomponents/CreateUser';
import { Link } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

describe('CreatePeer component test', () => {

    it('props rendering', () => {

        const wrapper = shallow(<Peer peers={[{ name: "testpeer1" }, { name: "testpeer2" }]} />);
        expect(wrapper.props.peers).toBeTruthy;
        expect(wrapper.find('.peer-container')).toBeTruthy;
        expect(wrapper.find('#peer')).toBeTruthy;

    })

    it('render same amount of peers as in the props', () => {

        const wrapper = shallow(<Peer peers={[{ name: "testpeer1" }, { name: "testpeer2" }]} />);
        expect(wrapper.props.peers).toBeTruthy;

        expect(wrapper.find('#peer')).toHaveLength(2);
        expect(wrapper.find(Arrow)).toHaveLength(2);
    });

    it('includes link to dashboard component', () => {
        let expectedState = { peer: "testpeer1" }
        const wrapper = shallow(<Peer peers={[{ name: "testpeer1" }]} />);


        //expect the Link path is to main dashboard
        expect(wrapper.find(Link).props().to.pathname).toBe('/main/user');


        //expect the Link path send the state with peername to main dashboard
        expect(wrapper.find(Link).props().to.state).toEqual(expectedState);
    });

});