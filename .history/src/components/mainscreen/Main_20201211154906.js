import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';

import Apps from './subcomponents/Apps';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
//import css-File
import '../../css/mainscreen/Main.css';





class Main extends Component {


    state = {
        username: this.props.location.state ? this.props.location.state.peer : "",
        apps: [
            { 'name': 'Chat' },
            { 'name': 'Work' }
        ],
        alertopen: false,
        alertmsg: '',
        alerttype: ''
    }

    doCreateApp = (newApp) => {
        let url = 'http://localhost:8080/api/v1/asap/app?peer=' + this.state.userName + '&&app=' + newApp;
        axios.post(url)
            .then(res => {
               res.data === null ?
                    this.setState({ alertopen: !this.state.alertopen, alertmsg: "Something went wrong: Couldn't create the app workspace", alerttype: "error" })
                            :
                    this.setState({ alertopen: !this.state.alertopen, alertmsg: "App created successfully ", alerttype: "success" , apps: [...this.state.apps, res.data]})
                
                
                
                
                
                
                
                })
            }

    // componentDidMount() {

    //     if (this.props.location.state !== undefined && this.props.location.state.peer !== undefined) {
    //         this.setState({ username: this.props.location.state.peer });

    //         console.log(this.props.location.state)
    //     }
    // }
    handleClose = (event, reason) => {
        this.setState({ alertopen: !this.state.alertopen });
    }

    render() {
        const { username, alertmsg, alertopen,alerttype } = this.state;


        if (username === undefined || username === "") {
            return <Redirect to="/login" />;
        } else {
            return (
                <div class="main">
                    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertopen} autoHideDuration={2000} onClose={this.handleClose}>
                        <Alert onClose={this.handleClose} severity={alerttype}>
                            {alertmsg}
                        </Alert>
                    </Snackbar>
                    <div id="bar"></div>
                    <div class="main-content">
                        <section class="navigation">
                            <div class="user-info">
                                <AccountCircleIcon id="accountIcon" />
                           Welcome  <b> {this.state.username}</b>
                                <Link to="/login" className="exit">     <ExitToAppIcon id="exit-icon" className="icon" /> </Link>
                            </div>

                            <div className="main-items">

                                <Apps apps={this.state.apps} doCreateApp={this.doCreateApp} />




                            </div>
                        </section>
                        <section class="main-screen">


                        </section>

                        <section class="connection-bar">



                        </section>


                    </div>
                </div>
            );
        }



    }
}




export default Main;