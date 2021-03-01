import React, { Fragment, Component } from 'react'
import { Redirect } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import SockJsClient from 'react-stomp';




import Apps from './subcomponents/Apps';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import { withSnackbar } from 'notistack';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Alert from '@material-ui/lab/Alert';
import Tooltip from '@material-ui/core/Tooltip';



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
        appSelectedName: '',
        channelUriSelected: '',
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

    setMessageMetaInfo = (appName, channel, channelSelected) => {
        this.setState({ appSelectedName: appName, channelSelected: channelSelected, channelUriSelected: channel.uri })
    }



    componentDidMount() {
        this.getStorage();
    }

    getStorage() {
        axios.get('http://localhost:8080/api/v1/asap/storages?peer=' + this.state.username)
            .then(res => this.setState({ apps: res.data }))
    }


    handleClose = (event, reason) => {
        this.setState({ alertopen: !this.state.alertopen });
    }

    handleCloseNotify = (event, reason) => {
        this.setState({ notifyopen: !this.state.notifyopen });
    };

    toggleShowMessage = (appSelected, appName) => {
        this.setState({ appSelected: appSelected, channelSelected: false, appSelectedName: appName });
    }

    render() {

        const { alertmsg, alertopen, alerttype, channelSelected, appSelected } = this.state;

        // if (this.state.username === undefined || this.state.username === "") {
        //     return <Redirect to="/login" />;
        // } else {
        return (
            <div className="main">
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertopen} autoHideDuration={2000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity={alerttype}>
                        {alertmsg}
                    </Alert>
                </Snackbar>

                <div id="bar"></div>
                <div className="main-content">
                    <section className="navigation">
                        <div className="user-info">
                            <AccountCircleIcon id="accountIcon" />
                           Welcome  <b> {this.state.username}</b>
                            <Link to="/login" className="exit">
                                <Tooltip title="Logout">

                                    <ExitToAppIcon id="exit-icon" className="icon" />
                                </Tooltip>

                            </Link>
                        </div>

                        <div className="main-items">
                            <Apps apps={this.state.apps} doCreateApp={this.doCreateApp} username={this.state.username} setMessageMetaInfo={this.setMessageMetaInfo} toggleShowMessage={this.toggleShowMessage} />
                        </div>
                    </section>
                    <section className="main-screen">
                        {
                            channelSelected && appSelected ?
                                <Messages userName={this.state.username} channelUriSelected={this.state.channelUriSelected} appSelected={this.state.appSelectedName} />
                                :
                                null
                        }

                    </section>

                    <section className="connection-bar">

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
                            const action = key => (
                                <Fragment>
                                    <IconButton size="small" aria-label="close" color="inherit" onClick={() => { this.props.closeSnackbar(key) }}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </Fragment>
                            );
                            this.props.enqueueSnackbar(message, {
                                anchorOrigin: {
                                    vertical: 'top',
                                    horizontal: 'center',
                                },
                                persist: true,
                                action
                            });
                        }}
                        ref={(client) => { this.clientRef = client }} />

                </div>
                <div className="console-main">
                    <Terminal />
                </div>
            </div>

        );
    }



    // }
}



export { Main };
export default withSnackbar(Main);