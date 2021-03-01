import React from 'react';

import { SnackbarProvider } from 'notistack';

import { ReactComponent as Arrow } from './arrow.svg';
import Login from './components/loginscreen/Login';
import Main from './components/dashboard/Main';
import Start from './components/startscreen/Start';

import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom'

import './css/App.css';


function App() {


  return (
    <SnackbarProvider>
      <Router>
        <Route path="/" component={Start} />
        <Route path="/login" component={Login} />
        <Route path="/main/user" component={Main} />
      </Router>
    </SnackbarProvider>
  );
}



export default App;
