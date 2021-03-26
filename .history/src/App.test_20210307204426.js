import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import { Route } from 'react-router-dom';
import { ReactComponent as Arrow } from './arrow.svg';
import Login from './components/loginscreen/Login';
import Main from './components/dashboard/Main';
import Start from './components/startscreen/Start';


Enzyme.configure({ adapter: new Adapter() });

describe('App component test', () => {
  it('test router map to correct component', () => {
    const wrapper = shallow(<App />);

    const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.component;
      return pathMap;
    }, {});

    expect(pathMap['/']).toBe(Start);
    expect(pathMap['/login']).toBe(Login);
    expect(pathMap['/main/user']).toBe(Main);

  })



});

