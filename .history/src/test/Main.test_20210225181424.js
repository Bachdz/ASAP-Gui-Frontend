import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from '../components/dashboard/Main';
import { Redirect } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';


Enzyme.configure({ adapter: new Adapter() });

describe('Main component test', () => {

    it('consists Redirect', () => {
        const wrapper = shallow(<Main />)
        expect(wrapper.find(Snackbar)).toHaveLength(1);
    })


});