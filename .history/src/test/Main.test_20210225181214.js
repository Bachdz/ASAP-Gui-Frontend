import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from '../components/mainscreen/Main';
import { Redirect } from 'react-router-dom';


Enzyme.configure({ adapter: new Adapter() });

describe('CreatePeer component test', () => {

    it('consists 2 buttons ', () => {
        const wrapper = shallow(<Main />)
        expect(wrapper.find(Redirect).length).toEqual(1);
    })


});