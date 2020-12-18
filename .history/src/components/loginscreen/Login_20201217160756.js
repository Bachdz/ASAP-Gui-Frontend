import React, { Component } from 'react';
import Peer from './subcomponents/Peer';
import CreateUser from './subcomponents/CreateUser';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Terminal from '../fragments/Terminal';
import ReactDOM from 'react-dom';



import '../../css/loginscreen/Login.css';
import axios from 'axios';



class Login extends React.Component {
    state = {
        peers: [],
        alertopen: false,
        alertmsg: '',
        alerttype: '',
        consolelog: []
    }


    getLog = () => {
        axios.get('http://localhost:8080/api/v1/asap/logdata')
            .then(res => this.setState({ consolelog: res.data }))
    }
    componentDidMount() {
        setTimeout(() => {
            axios.get('http://localhost:8080/api/v1/asap/peers')
                .then(res => this.setState({ peers: res.data }))
            this.getLog();
        }, 2000);



    }


    //create User
    addUser = (userName) => {
        let url = 'http://localhost:8080/api/v1/asap/peer?name=' + userName;
        axios.post(url)
            .then(res => this.setState({ peers: [...this.state.peers, res.data] }, () => this.getLog())
            )

    }

    //remove all users
    removeAllUser = () => {
        axios.delete('http://localhost:8080/api/v1/asap/peers')
            .then(res => {
                if (res.data === false) {
                    this.setState({ alertopen: !this.state.alertopen, alertmsg: "Couldn't delete peers", alerttype: "error" }, () => this.getLog());

                } else if (res.data === true) {
                    this.setState({ alertopen: !this.state.alertopen, alertmsg: "Deleted successfully ", alerttype: "success" });
                    axios.get('http://localhost:8080/api/v1/asap/peers')
                        .then(res => this.setState({ peers: res.data }, () => this.getLog()))
                }



            }


            )



    }

    handleClose = (event, reason) => {
        this.setState({ alertopen: !this.state.alertopen });
    }


    render() {
        const { alertopen, alertmsg, alerttype } = this.state;
        return (
            <div>

                <div className="background-container">
                    <div className="content">
                        <div className="login-container">
                            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertopen} autoHideDuration={2000} onClose={this.handleClose}>
                                <Alert onClose={this.handleClose} severity={alerttype}>
                                    {alertmsg}
                                </Alert>
                            </Snackbar>
                            <h1>Please choose a peer</h1>
                            <Peer peers={this.state.peers} />

                            <div id="remove-peer">
                                <CloseIcon id="remove" onClick={this.removeAllUser} /> Remove all peers
            </div>
                            <CreateUser addUser={this.addUser} />

                        </div>
                    </div>

                </div>
                <Terminal consolelog={this.state.consolelog} />

            </div>

        );
    }
}


export default Login;