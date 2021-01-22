import React, { Component } from 'react'
import '../../../css/mainscreen/Messages.css';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import SockJsClient from 'react-stomp';

class Messages extends Component {
    state = {
        content: [],
        received: [],
        messValue: '',
        alertopen: false,
        alertmsg: '',
        alerttype: '',
    }

    componentDidMount() {
        let urlContent = 'http://localhost:8080/api/v1/asap/messages?peer=' + this.props.userName + '&storage=' + this.props.appSelected + '&uri=' + this.props.channelUriSelected;
        axios.get(urlContent)
            .then(res => this.setState({ content: res.data }))

        let urlReceived = 'http://localhost:8080/api/v1/asap/received?peer=' + this.props.userName + '&storage=' + this.props.appSelected + '&uri=' + this.props.channelUriSelected;

        axios.get(urlReceived)
            .then(res => this.setState({ received: res.data }))



    }

    getMessValue = (e) => {
        this.setState({ messValue: e.target.value })
    }

    createNewMess = (e) => {
        e.preventDefault();
        let obj = {
            mess: this.state.messValue,
        };

        let url = 'http://localhost:8080/api/v1/asap/addmessages?peer=' + this.props.userName + '&app=' + this.props.appSelected + '&uri=' + this.props.channelUriSelected;
        axios.post(url, obj)
            .then(res => {
                res.data === null ?
                    this.setState({ alertopen: !this.state.alertopen, alertmsg: "Something went wrong: Couldn't add message", alerttype: "error" })
                    :
                    this.setState({ alertopen: !this.state.alertopen, alertmsg: "Message added successfully ", alerttype: "success", content: [...this.state.content, res.data.mess], messValue: '' })
            })


    }
    render() {
        const channelListener = "/received/message/" + this.props.channelUriSelected;

        const { alertmsg, alertopen, alerttype } = this.state;

        const handleClose = (event, reason) => {
            this.setState({ alertopen: !this.state.alertopen });
        }
        return (
            <div className="messages-container">
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertopen} autoHideDuration={1000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alerttype}>
                        {alertmsg}
                    </Alert>
                </Snackbar>
                <div className="mess">

                    {this.state.content.length > 0 ?
                        <div className="mess-content">
                            <b>  {this.props.userName}</b>
                            {this.state.content.map((mess) => (
                                <div id="self-mess"> {mess} </div>
                            ))
                            }
                        </div>
                        :
                        <p>There are currently no messages in this channel</p>
                    }



                    <div className="received-content">
                        <div className="inbox">


                            {this.state.received.length > 0 ?
                                <div className="mess-content">

                                    {this.state.received.map((mess) => (
                                        <div className="inbox-content" >
                                            <b id="sender">{mess.sender}</b>

                                            {mess.messages.map((value) =>
                                                <div id="received-mess">{value}</div>

                                            )}



                                        </div>
                                    ))
                                    }
                                </div>
                                :
                                null
                            }




                        </div>
                    </div>
                </div>
                <div className="box">
                    <div class="message-box">

                        <form onSubmit={this.createNewMess}>
                            <input type="text" value={this.state.messValue} class="message-input" placeholder="Type message..." onChange={(e) => this.setState({ messValue: e.target.value })}></input>

                            <button type="submit" class="message-submit" >Add</button>
                        </form>
                    </div>
                </div>
                <SockJsClient url='http://localhost:8080/websocket/'
                    topics={[channelListener]}

                    onConnect={() => {
                        console.log("connected to websocket and listen to messages listener on " + channelListener)
                    }}

                    onDisconnect={() => {
                        console.log("disconnected to websocket listener on " + channelListener)
                    }}

                    onMessage={(msg) => {
                        console.log(msg)
                        this.forceUpdate();
                    }}
                    ref={(client) => { this.clientRef = client }} />

            </div>
        )
    }

}

export default Messages