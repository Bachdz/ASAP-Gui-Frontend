import React , { Component } from 'react';
import Peer from './Peer';
import CreateUser from './CreateUser';
import CloseIcon from '@material-ui/icons/Close';

import '../css/Login.css';
class Login extends Component {
    state = {
        peers: [
            {name: "Bach"},
            {name: "Alice"},
            {name: "Bob"}
        ]
    }
    
    render() { 
        return (
            <div className="login-container">
            <h1>Please choose a peer</h1>
            <Peer peers={this.state.peers}/>

            <div id="remove-peer">
            <CloseIcon id="remove" /> Remove all peers
            </div>
            <CreateUser />
            </div>

        
          );
    }
    
}
 
export default Login ;