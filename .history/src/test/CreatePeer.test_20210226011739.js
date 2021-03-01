import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateUser from '../components/loginscreen/subcomponents/CreateUser';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';


Enzyme.configure({ adapter: new Adapter() });

describe('CreatePeer component test', () => {




    it('consists 2 buttons ', () => {
        const wrapper = shallow(<CreateUser />)
        expect(wrapper.find(Button).length).toEqual(2);
    })

    it('consists 1 dialog element for user form creating ', () => {
        const wrapper = shallow(<CreateUser />)
        expect(wrapper.find(Dialog).length).toEqual(1);
    })

    it('trigger handleClickOpen function on button click  ', () => {
        const wrapper = shallow(<CreateUser />)
        wrapper.find("#addButton").simulate('click');
        expect(wrapper.instance().handleClickOpen()).toHaveBeenCalled;
    })

    it('trigger onsubmit function on button click  ', () => {
        const wrapper = shallow(<CreateUser />)
        wrapper.find("#button").simulate('click');
        expect(wrapper.instance().onSubmit()).toHaveBeenCalled;
    })

    /*Integration test   */
    it('call the addUser function from the props ', () => {
        const addUser = jest.fn();
        const wrapper = shallow(<CreateUser addUser={addUser} />)
        wrapper.setState({ username: "testpeer" })
        wrapper.instance().onSubmit();
        expect(addUser).toHaveBeenCalled;
    })


    it('call the state error will be set to true if username equal blank ', () => {
        const addUser = jest.fn();
        const wrapper = shallow(<CreateUser addUser={addUser} />)
        wrapper.instance().onSubmit();
        expect(wrapper.state().error).toBe(true);
    })






});