import React , { Component } from 'react';
import Peer from './Peer';
import CreateUser from './CreateUser';
import CloseIcon from '@material-ui/icons/Close';

import '../css/Login.css';
import axios from 'axios';
class Login extends Component {
    state = {
        peers: []
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/v1/asap/peers')
        .then(res => this.setState({peers: res.data}))
    }

    //create User
    addUser = (userName) => {
        let url = 'http://localhost:8080/api/v1/asap/peer?name='+userName;
        console.log(url)
        axios.post(url)
            .then(res => this.setState({peers:[...this.state.peers, res.data]} ))
    }

    //remove all users
    removeAllUser  = ()=>  {
        axios.delete('http://localhost:8080/api/v1/asap/peers')
            .then(res => {
                
              console.log(res);

            }
        
        
        )
    }
    
    render() { 
        return (
            <div className="login-container">
            <h1>Please choose a peer</h1>
            <Peer peers={this.state.peers}/>

            <div id="remove-peer">
            <CloseIcon id="remove" onClick={this.removeAllUser} /> Remove all peers
            </div>
            <CreateUser addUser= {this.addUser} />
            </div>

        
          );
    }
    
}
 
export default Login ;