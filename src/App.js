import React from 'react';


import { ReactComponent as Logo1 } from './Vector1.svg';
import { ReactComponent as Logo2 } from './Vector2.svg';
import { ReactComponent as Arrow } from './arrow.svg';
import Login from './components/Login';
import {Link} from 'react-router-dom';



import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';

function App() {
  return (
    <div className="container">
      <Router>
        <Route exact path="/" render={props => (
          <React.Fragment>
            <div className="content">
              <div id="box">
                <h1>Welcome to ASAP engine</h1>
                <Link to="/login">
                <Arrow id="next"/>
                </Link>
              </div>

            </div>
          </React.Fragment>
        )} />

        <Route path="/login" component={Login} />

      </Router>


      <footer>
        <Logo1 className="logo1" />
        <Logo2 className="logo2" />
      </footer>
    </div>
  );
}



export default App;
