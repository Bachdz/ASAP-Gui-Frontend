import React from 'react';



import { ReactComponent as Arrow } from './arrow.svg';
import Login from './components/loginscreen/Login';
import Main from './components/mainscreen/Main';
import { Link, useHistory, withRouter } from 'react-router-dom';
import Logo from './components/fragments/Footer';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';



function App(props) {
  const doInitializeApp = () => {
    axios.get('http://localhost:8080/api/v1/asap/start').then(res => {
      if (res.data === true) {
        props.history.push(null, 'login')


      }
    })
  }

  return (
    <Router>
      <Route exact path="/" render={props => (
        <React.Fragment>
          <div className="container">

            <div className="content">
              <div id="box">
                <h1>Welcome to ASAP engine</h1>
                <Arrow id="next" onClick={doInitializeApp} />
              </div>
            </div>
            <Logo />
          </div>


        </React.Fragment>
      )} />
      <Route path="/login" component={Login} />
      <Route path="/main/user" component={Main} />

    </Router>
  );
}



export default App;
