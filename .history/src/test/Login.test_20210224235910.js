import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../components/loginscreen/Login';
import axios from "axios";

Enzyme.configure({ adapter: new Adapter() });




// describe('Start', () => {
//     it('test component contains arrow element', () => {
//         const wrapper = shallow(<Start />);
//         expect(wrapper.find(Arrow)).toHaveLength(1);
//     })
// });

