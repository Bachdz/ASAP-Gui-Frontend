import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Apps from '../components/dashboard/subcomponents/Apps';



Enzyme.configure({ adapter: new Adapter() });

describe('Apps component test', () => {

    it('call the state error will be set to true if username equal blank ', () => {
        const addUser = jest.fn();
        const doCreateApp = jest.fn();
        const setMessageMetaInfo = jest.fn();
        const toggleShowMessage = jest.fn();

        const mockedApps = [{ name: "testApp1" }, { name: "tesApp2" }]
        const wrapper = shallow(<Apps apps={mockedApps} doCreateApp={doCreateApp} username={"testUser"} setMessageMetaInfo={setMessageMetaInfo} toggleShowMessage={toggleShowMessage} />)

        expect(wrapper.props().apps).toHaveLength(2);
    })





});