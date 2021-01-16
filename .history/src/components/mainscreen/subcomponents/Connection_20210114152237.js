import React, { Component } from 'react';
//import css-File
import GroupIcon from '@material-ui/icons/Group';
import CachedIcon from '@material-ui/icons/Cached';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import PublicIcon from '@material-ui/icons/Public';
import '../../../css/mainscreen/Connection.css';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

import SendReceived from '../../fragments/SendReceived';

class Connection extends Component {
    state = {
        showConnectToHost: true,
        openConnectToHost: false,
        activateConnectToHost: false,

        showAddConnection: true,
        openAddConnection: false,
        activateAddConnection: false,

        newPort: '',
        hostNameToConnect: '',
        hostSocketToConnect: '',
        alertopen: false,
        alertmsg: '',
        alerttype: '',

        showHostInfo: false,
        showClientInfo: false,
        openedConnection: {},

        connectionAttempt: []


    }


    doConnectToHost = () => {
        const url = 'http://localhost:8080/api/v1/asap/connect?host=' + this.state.hostNameToConnect + '&port=' + this.state.hostSocketToConnect + '&peer=' + this.props.userName;
        console.log(url);
        let obj = {};
        obj.ip = this.state.hostNameToConnect;
        obj.port = this.state.hostSocketToConnect;
        obj.initialized = false;
        this.setState({ connectionAttempt: [...this.state.connectionAttempt, obj], showClientInfo: true, openConnectToHost: false })


        axios.post(url).then(res => {
            if (res.dta !== null) {
                this.state.connectionAttempt.find((element, index) => {
                    if (element.ip === res.data.ip && element.port === res.data.port) {
                        this.state.connectionAttempt[index] = res.data
                        return true;
                    }
                });
            } else {
                this.setState({ alertopen: !this.state.alertopen, alertmsg: "Couldn't establish connection", alerttype: "error" })
            }
        })


    }

    doTerminateConnection = (host, port) => {
        const url = 'http://localhost:8080/api/v1/asap/terminateconnection?host=' + host + '&port=' + port;
        console.log("cancel connection to: " + host + ":" + port);
        axios.post(url).then(res => {
            if (res.data === true) {
                let array = [...this.state.connectionAttempt];

                for (var i = array - 1; i >= 0; --i) {
                    if (array[i].ip === host && array[i].port === port) {
                        array.splice(i, 1);
                    }
                }
                console.log(array);
                this.setState({ connectionAttempt: array, alertopen: !this.state.alertopen, alertmsg: "Connection successfully canceled", alerttype: "success" });

            } else {
                this.setState({ alertopen: !this.state.alertopen, alertmsg: "Couldn't cancel connection attempt", alerttype: "error" })
            }
        })
    }



    doOpenConnection = () => {
        const url = 'http://localhost:8080/api/v1/asap/openconnection?port=' + this.state.newPort + '&peer=' + this.props.userName;
        axios.post(url).then(res => {

            res.data !== null ?
                this.setState({ openedConnection: res.data, showHostInfo: true, openAddConnection: !this.state.openAddConnection, showAddConnection: !this.state.showAddConnection })

                :
                this.setState({ alertopen: !this.state.alertopen, alertmsg: "Something went wrong, couldn't open connection", alerttype: "error" })
        });
    }
    doTerminateServer = (e) => {
        const url = 'http://localhost:8080/api/v1/asap/terminate?port=' + this.state.newPort;

        axios.post(url).then(res => {
            res.data === true ?
                this.setState({ alertopen: !this.state.alertopen, alertmsg: "Host succesfully cancelled", alerttype: "success", showHostInfo: false, showAddConnection: !this.state.showAddConnection })
                :
                this.setState({ alertopen: !this.state.alertopen, alertmsg: "Something went wrong, couldn't cancel host", alerttype: "error" })

        })
    }


    doSetOnlineMess = (e) => {
        const urlActivate = 'http://localhost:8080/api/v1/asap/activatemess?peer=' + this.props.userName;
        const urlDeactivate = 'http://localhost:8080/api/v1/asap/deactivatemess?peer=' + this.props.userName;

        e.target.checked ?
            axios.get(urlActivate)
                .then(res => {
                    res.data === true ?
                        this.setState({ alertopen: !this.state.alertopen, alertmsg: "Online sending messages activated", alerttype: "success" })
                        :
                        this.setState({ alertopen: !this.state.alertopen, alertmsg: "Couldn't activate online sending messages ", alerttype: "error" })
                })
            :
            axios.get(urlDeactivate)
                .then(res => {
                    res.data === true ?
                        this.setState({ alertopen: !this.state.alertopen, alertmsg: "Online sending messages deactivated", alerttype: "success" })
                        :
                        this.setState({ alertopen: !this.state.alertopen, alertmsg: "Couldn't deactivate online sending messages ", alerttype: "error" })
                })

    }
    doGetSendReceived = () => {
        const url = 'http://localhost:8080/api/v1/asap/getsendreceived?peer=' + this.props.userName + '&storage=' + this.props.appSelectedName + '&value=';
        console.log(url);
        let state;
        axios.get(url).then(res => {
            state = res;
            console.log("State:" + state)

        })
        return state;
    }


    doSetSendReceived = (e) => {
        const url = 'http://localhost:8080/api/v1/asap/setsendreceived?peer=' + this.props.userName + '&storage=' + this.props.appSelectedName + '&value=' + e.target.checked;
        axios.get(url)
            .then(res => {
                res.data === true ?
                    this.setState({ alertopen: !this.state.alertopen, alertmsg: "Status for send received succesfully set", alerttype: "success" })
                    :
                    this.setState({ alertopen: !this.state.alertopen, alertmsg: "Couldn't set status for send received ", alerttype: "error" })
            });
        console.log(url);
    }


    render() {
        const { showHostInfo,
            showClientInfo,
            showConnectToHost,
            openConnectToHost,
            activateConnectToHost,
            showAddConnection,
            openAddConnection,
            activateAddConnection,
            alertmsg, alertopen, alerttype,
            openedConnection,
            connectionAttempt } = this.state;

        function isInt(value) {
            return !isNaN(value) &&
                parseInt(Number(value)) == value &&
                !isNaN(parseInt(value, 10));
        }

        const validate = (e) => {
            if (e.target.value.length === 4 && isInt(e.target.value) && (e.target.value.search(/\./) < 0)) {

                this.setState({ activateAddConnection: true, newPort: e.target.value })
            } else {
                this.setState({ activateAddConnection: false })
            }
        }

        const validateHostName = (e) => {
            this.setState({ hostNameToConnect: e.target.value }, () => validateConnectToHost())
        }

        const validateHostSocket = (e) => {
            if (e.target.value.length === 4 && isInt(e.target.value) && (e.target.value.search(/\./) < 0)) {
                this.setState({ hostSocketToConnect: e.target.value }, () => validateConnectToHost())
            } else {
                this.setState({ hostSocketToConnect: '' }, () => validateConnectToHost())
            }
        }

        const validateConnectToHost = () => {
            if (this.state.hostNameToConnect.length > 0 && this.state.hostSocketToConnect.length > 0) {
                this.setState({ activateConnectToHost: true })
            } else {
                this.setState({ activateConnectToHost: false })
            }

        }

        const showAdd = () => {
            this.setState({ openAddConnection: !openAddConnection })
        }
        const showConnect = () => {
            this.setState({ openConnectToHost: !openConnectToHost })

        }


        const handleClose = (event, reason) => {
            this.setState({ alertopen: !this.state.alertopen });
        }



        return (
            <div className="connection-menu">
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertopen} autoHideDuration={1000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alerttype}>
                        {alertmsg}
                    </Alert>
                </Snackbar>


                {connectionAttempt.length > 0 ?

                    connectionAttempt.map((item, index) => {
                        return (
                            item.initialized === false ?

                                <div className="hosted-server">
                                    Attempting to connect to {item.ip}:{item.port} ...
                                <CloseIcon id="close-icon" className="icon" onClick={this.doTerminateConnection.bind(this, item.ip, item.port)} />
                                </div>
                                :
                                <div className="hosted-server">
                                    Connection to {item.ip}:{item.port} established
                            <CloseIcon id="close-icon" className="icon" onClick={this.doTerminateConnection.bind(this, item.ip, item.port)} />
                                </div>
                        )
                    })

                    :
                    null
                }

                {showHostInfo ?
                    <div className="hosted-server">
                        <PublicIcon id="icon" />  You are now hosting:<br /> {openedConnection.ip} | Port {openedConnection.port}
                        <CloseIcon id="close-icon" className="icon" onClick={this.doTerminateServer} />
                    </div>
                    :
                    null
                }



                <div className="connection">
                    <p id="title">   <GroupIcon id="icon" /> Available connections</p>
                    <p className="connection-information">  No available connections</p>
                    <CachedIcon id="refresh-icon" />
                </div>
                <div className="setting">

                    {showConnectToHost ?
                        <p className="connection-setting">
                            Connect to a remote server
                            {
                                openConnectToHost ?
                                    <RemoveIcon id="removeIcon" className="icon" onClick={showConnect} />
                                    :
                                    <AddIcon id="addIcon" className="icon" onClick={showConnect} />

                            }


                        </p>

                        :
                        null
                    }
                    {
                        openConnectToHost ?
                            <div className="add">
                                <input autoComplete="off" type="text" className="input" placeholder="IP/DNS-Name" onChange={validateHostName} />
                                <input autoComplete="off" type="text" className="input" placeholder="Port " onChange={validateHostSocket} />

                                {
                                    activateConnectToHost ?
                                        <CheckIcon id="checkicon-activate" className="icon" onClick={this.doConnectToHost} />
                                        :

                                        <CheckIcon id="checkicon-inactive" />

                                }



                            </div>
                            : null
                    }


                    {showAddConnection ?
                        <p className="connection-setting">
                            Open a connection
                      {
                                openAddConnection ?
                                    <RemoveIcon id="removeIcon" className="icon" onClick={showAdd} />
                                    :
                                    <AddIcon id="addIcon" className="icon" onClick={showAdd} />

                            }


                        </p>

                        :
                        null
                    }



                    {
                        openAddConnection ?
                            <div className="add">
                                <input autoComplete="off" type="text" id="addConnection" name="connectionID" className="input" placeholder="Enter connection socket, e.g. 7070 " onChange={validate} />

                                {
                                    activateAddConnection ?
                                        <CheckIcon id="checkicon-activate" className="icon" onClick={this.doOpenConnection} />
                                        :

                                        <CheckIcon id="checkicon-inactive" />

                                }



                            </div>
                            : null
                    }
                    <p className="toggle-setting">
                        <label class="switch">
                            <input type="checkbox" onChange={this.doSetOnlineMess} />
                            <span class="slider round"></span>
                        </label> Set messages online sending

                    </p>
                    {
                        this.props.appSelected ?
                            <SendReceived setSendReceived={this.doSetSendReceived} userName={this.props.userName} appSelectedName={this.props.appSelectedName} />
                            :
                            null

                    }




                </div>
            </div>
        )
    }
}



export default Connection