import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateUser from '../components/loginscreen/subcomponents/CreateUser';
import { Link } from 'react-router-dom';
import { Create } from '@material-ui/icons';

Enzyme.configure({ adapter: new Adapter() });

describe('CreatePeer component test', () => {

    it('call the addUser function from the props ', () => {
        const addUser = jest.fn();
        const handleClose = jest.fn();
        const wrapper = shallow(<CreateUser addUser={addUser} />)
        wrapper.setState({ username: "testpeer" })
        wrapper.instance().onSubmit();
        expect(addUser).toHaveBeenCalled;
    })

    it('call set the state error if username equal blank ', () => {
        const addUser = jest.fn();
        const handleClose = jest.fn();
        const wrapper = shallow(<CreateUser addUser={addUser} />)
        wrapper.instance().onSubmit();
        expect(wrapper.state().error).toBe(true);
    })

});