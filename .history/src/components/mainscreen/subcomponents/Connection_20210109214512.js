import React, { Component } from 'react';
//import css-File
import GroupIcon from '@material-ui/icons/Group';
import CachedIcon from '@material-ui/icons/Cached';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CheckIcon from '@material-ui/icons/Check';
import PublicIcon from '@material-ui/icons/Public';
import '../../../css/mainscreen/Connection.css';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

import SendReceived from '../../fragments/SendReceived';

class Connection extends Component {
    state = {
        openAddConnection: false,
        activateAddConnection: false,
        newPort: '',
        alertopen: false,
        alertmsg: '',
        alerttype: '',
        showHost: false,
        openedConnection: {},
        showHostInfo: false


    }

    doOpenConnection = () => {
        const url = 'http://localhost:8080/api/v1/asap/openconnection?port=' + this.state.newPort + '&peer=' + this.props.userName;
        axios.post(url).then(res => { this.setState({ openedConnection: res.data, showHostInfo: true, openAddConnection: !this.state.openAddConnection }) });

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
        axios.get(url);
        console.log(url);
    }

    render() {
        const { openAddConnection, activateAddConnection, alertmsg, alertopen, alerttype, openedConnection, showHostInfo } = this.state;

        const createNewConnection = () => {

            this.setState({ openAddConnection: !this.state.openAddConnection })
        }

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


                {showHostInfo ?
                    <div className="hosted-server">
                        <PublicIcon id="icon" />  You are now hosting:<br /> {openedConnection.ip} | Port {openedConnection.port}
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
                    <p id="open-connection">
                        Open a connection
                        {
                            openAddConnection ?
                                <RemoveIcon id="removeIcon" className="icon" onClick={createNewConnection} />
                                :
                                <AddIcon id="addIcon" className="icon" onClick={createNewConnection} />

                        }


                    </p>
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