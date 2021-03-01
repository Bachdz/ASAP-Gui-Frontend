import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from '../components/dashboard/Main';

import Snackbar from '@material-ui/core/Snackbar';




Enzyme.configure({ adapter: new Adapter() });

describe('Main component test', () => {
    it("has Snackbar component for showing information", () => {

        mockLocation = { state: { peer: "testPeer" } };

        const wrapper = shallow(
            <Main location={mockLocation} />
        )

        expect(wrapper.find('.navigation').length).toEqual(1);

    });
});