import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from '../components/dashboard/Main';

import Snackbar from '@material-ui/core/Snackbar';




Enzyme.configure({ adapter: new Adapter() });

describe('Main component test', () => {
    it("has Snackbar component for showing information", () => {
        const wrapper = shallow(<Main />);
        expect(wrapper.find('Snackbar')).toHaveLength(1);
    });



});