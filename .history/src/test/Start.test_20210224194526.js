import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Start from '../components/startscreen/Start';
import { ReactComponent as Arrow } from './arrow.svg';


Enzyme.configure({ adapter: new Adapter() });

describe('Start', () => {
    it('test component contains arrow element', () => {
        const wrapper = shallow(<Start />);
        expect(wrapper.find(Arrow)).to.have.lengthOf(1);
    })


});

