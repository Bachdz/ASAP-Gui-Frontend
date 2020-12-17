import React from 'react';



import { ReactComponent as Arrow } from './arrow.svg';
import Login from './components/loginscreen/Login';
import Main from './components/mainscreen/Main';
import { Link } from 'react-router-dom';
import Logo from './components/fragments/Footer';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';

const doInitializeApp = () => {
  axios.get('http://localhost:8080/api/v1/asap/peers')
}


function App() {

  return (
    <Router>
      <Route exact path="/" render={props => (
        <React.Fragment>
          <div className="container">

            <div className="content">
              <div id="box">
                <h1>Welcome to ASAP engine</h1>
                <Link to="/login"><Arrow id="next" onclick={this.doInitializeApp} /></Link>
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
