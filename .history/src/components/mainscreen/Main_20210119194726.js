import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import SockJsClient from 'react-stomp';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


import Apps from './subcomponents/Apps';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import { withSnackbar } from 'notistack';

import Alert from '@material-ui/lab/Alert';
import Terminal from '../fragments/Terminal';
import Messages from './subcomponents/Messages';
import Connection from './subcomponents/Connection';
//import css-File
import '../../css/mainscreen/Main.css';





class Main extends Component {


    state = {
        username: this.props.location.state ? this.props.location.state.peer : "",
        apps: [],
        alertopen: false,
        alertmsg: '',
        alerttype: '',
        channelSelected: false,
        appSelected: false,
        consolelog: [],
        appSelectedName: '',
        channelUriSelected: '',

        notify: [
            { format: "app", sender: "Bob", uni: "sn1://abChat", era: 0, isNew: true },
            { format: "play", sender: "Alice", uni: "sn1://abChat", era: 2, isNew: true },
            { format: "test", sender: "John", uni: "sn1://abChat", era: 3, isNew: true },

        ],
        notifymsg: ''
    }

    doCreateApp = (newApp) => {
        let url = 'http://localhost:8080/api/v1/asap/app?peer=' + this.state.username + '&app=' + newApp;
        console.log(url)
        axios.post(url)
            .then(res => {
                res.data === null ?
                    this.setState({ alertopen: !this.state.alertopen, alertmsg: "Something went wrong: Couldn't create the app workspace", alerttype: "error" })
                    :
                    this.setState({ alertopen: !this.state.alertopen, alertmsg: "App created successfully ", alerttype: "success", apps: [...this.state.apps, res.data] })
            })
    }

    showMainScreen = (appName, channel, channelSelected) => {
        this.setState({ channelSelected: channelSelected, appSelectedName: appName, channelUriSelected: channel.uri })
    }



    componentDidMount() {

        axios.get('http://localhost:8080/api/v1/asap/storages?peer=' + this.state.username)
            .then(res => this.setState({ apps: res.data }))
        this.getLog();
    }

    getLog = () => {
        axios.get('http://localhost:8080/api/v1/asap/logdata')
            .then(res => this.setState({ consolelog: res.data }))
    }


    handleClose = (event, reason) => {
        this.setState({ alertopen: !this.state.alertopen });
    }

    handleCloseNotify = (event, reason) => {
        this.setState({ notifyopen: !this.state.notifyopen });
    };


    render() {
        const { username, alertmsg, alertopen, alerttype, channelSelected, appSelected, notifyopen, notifymsg } = this.state;


        const toggleMainScreen = (appSelected, appName) => {
            this.setState({ appSelected: appSelected, channelSelected: false, appSelectedName: appName });
        }

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

                                <Apps apps={this.state.apps} doCreateApp={this.doCreateApp} username={username} showMainScreen={this.showMainScreen} toggleMainScreen={toggleMainScreen} />




                            </div>
                        </section>
                        <section class="main-screen">
                            {
                                channelSelected && appSelected ?

                                    <Messages userName={this.state.username} channelUriSelected={this.state.channelUriSelected} appSelected={this.state.appSelectedName} />
                                    :
                                    null

                            }

                        </section>

                        <section class="connection-bar">

                            <Connection appSelected={this.state.appSelected} userName={this.state.username} appSelectedName={this.state.appSelectedName} />


                        </section>
                        <SockJsClient url='http://localhost:8080/websocket/'
                            topics={['/received/user']}

                            onConnect={() => {
                                console.log("connected to websocket")
                            }}

                            onDisconnect={() => {
                                console.log("disconnected to websocket")
                            }}

                            onMessage={(msg) => {
                                console.log(msg);
                                let message = "Received new chunk from: " + msg.sender + " at : " + msg.format + " | channel: " + msg.uri + " | era: " + msg.era
                                this.props.enqueueSnackbar(message, {
                                    anchorOrigin: {
                                        vertical: 'top',
                                        horizontal: 'center',
                                    },
                                });
                            }}
                            ref={(client) => { this.clientRef = client }} />

                    </div>
                    <Terminal consolelog={this.state.consolelog} />

                </div>

            );
        }



    }
}




export default withSnackbar(Main);