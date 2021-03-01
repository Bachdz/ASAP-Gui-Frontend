import React from 'react';

import { SnackbarProvider } from 'notistack';

import { ReactComponent as Arrow } from './arrow.svg';
import Login from './components/loginscreen/Login';
import Main from './components/mainscreen/Main';
import Logo from './components/fragments/Footer';
import axios from 'axios';

import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom'

import './App.css';

function Content() {
  let history = useHistory();

  const doInitializeApp = () => {
    axios.get('http://localhost:8080/api/v1/asap/start').then(res => {
      if (res.data === true) {
        history.push('/login')
      } else {
        alert.push('something went wrong') //TODO
      }
    })
  }


  return (
    <div>
      <div className="container">

        <div className="content">
          <div id="box">
            <h1>Welcome to ASAP engine</h1>
            <Arrow id="next" onClick={doInitializeApp} />
          </div>
        </div>
        <Logo />
      </div>
    </div>
  );
}


function App() {


  return (
    <SnackbarProvider>
      <Router>
        <Route exact path="/" component={Content} />
        <Route path="/login" component={Login} />
        <Route path="/main/user" component={Main} />
      </Router>
    </SnackbarProvider>
  );
}



export default App;
