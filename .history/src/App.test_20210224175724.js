import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import { ReactComponent as Arrow } from './arrow.svg';

Enzyme.configure({ adapter: new Adapter() });



describe('App', () => {
  it('should render Arrow component', () => {

    const wrapper = shallow(<App />);
    expect(wrapper.find(Arrow)).to.have.lengthOf(1);

  })

});

