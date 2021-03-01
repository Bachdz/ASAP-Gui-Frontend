import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import { Route } from 'react-router-dom';
import { ReactComponent as Arrow } from './arrow.svg';
import Login from './components/loginscreen/Login';


Enzyme.configure({ adapter: new Adapter() });



describe('App', () => {
  it('test1', () => {

    const wrapper = shallow(<App />);
    const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.component;
      return pathMap;
    }, {});

    expect(pathMap['/login']).toBe(Login);

  })

});

