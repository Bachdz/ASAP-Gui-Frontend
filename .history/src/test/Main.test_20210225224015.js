import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { unWrappedMain as Main } from '../components/dashboard/Main';

import Snackbar from '@material-ui/core/Snackbar';




Enzyme.configure({ adapter: new Adapter() });

describe('Main component test', () => {

    it("will be ", () => {
        //prepare mock data for class 
        const mockLocation = { state: { peer: "testPeer" } };

        const wrapper = shallow(<Main location={mockLocation} />)

        expect(wrapper.find(Snackbar).length).toEqual(1);

    });

    it("has Snackbar component for showing information", () => {
        //prepare mock data for class 
        const mockLocation = { state: { peer: "testPeer" } };

        const wrapper = shallow(<Main location={mockLocation} />)

        expect(wrapper.find(Snackbar).length).toEqual(1);

    });
});