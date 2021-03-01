import React, { Component } from 'react'
import '../../../css/mainscreen/Messages.css';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import SockJsClient from 'react-stomp';
import { animateScroll } from "react-scroll";
import Tooltip from '@material-ui/core/Tooltip';

class Messages extends Component {
    state = {
        content: [],
        received: [],
        messValue: '',
        alertopen: false,
        alertmsg: '',
        alerttype: '',
    }


    getReceivedChunk = () => {
        let urlReceived = 'http://localhost:8080/api/v1/asap/received?peer=' + this.props.userName + '&storage=' + this.props.appSelected + '&uri=' + this.props.channelUriSelected;

        axios.get(urlReceived)
            .then(res => this.setState({ received: res.data }))
    }
    componentDidUpdate() {
        animateScroll.scrollToBottom({
            containerId: "scroll"
        })
        animateScroll.scrollToBottom({
            containerId: "scroll-received"
        })
    }

    componentDidMount() {
        this.getChunk();
        this.getReceivedChunk();
    }


    getChunk() {
        let urlContent = 'http://localhost:8080/api/v1/asap/messages?peer=' + this.props.userName + '&storage=' + this.props.appSelected + '&uri=' + this.props.channelUriSelected;
        axios.get(urlContent)
            .then(res => this.setState({ content: res.data }))
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
                    this.setState({ alertopen: !this.state.alertopen, alertmsg: "Message added successfully ", alerttype: "success", messValue: '' }, () => this.getChunk())
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
                <div className="big-title">
                    <div id="my-chunk"></div>
                    <div id="received-chunk"></div>
                </div>

                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertopen} autoHideDuration={1000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alerttype}>
                        {alertmsg}
                    </Alert>
                </Snackbar>


                <div className="mess">

                    {this.state.content.length > 0 ?
                        <div className="mess-content" id="scroll-received">
                            <b>  {this.props.userName}</b>
                            {this.state.content.map((content) => (
                                <Tooltip title={"ASAP-Chunk | Era " + content.era} placement="right">

                                    <div id="self-mess">

                                        <div id="era">    Era {content.era}</div>



                                        {content.messages.map((mess) => (
                                            <p>
                                                <p> {mess}</p>
                                            </p>



                                        ))}




                                    </div>
                                </Tooltip>
                            ))
                            }
                        </div>
                        :
                        <p>There are currently no messages in this channel</p>
                    }



                    <div className="received-content" id="scroll">


                        {this.state.received.length > 0 ?
                            <div className="received">

                                {this.state.received.map((content) => (
                                    <div className="inbox-content" >
                                        <b id="sender">{content.sender}</b>

                                        {content.chunk.map((chunk) =>

                                            <Tooltip title={"ASAP-Chunk | Era " + chunk.era} placement="left">
                                                <div id="received-mess">



                                                    <div id="era">    Era {chunk.era}</div>


                                                    {chunk.messages.map((mess) => (
                                                        <p>
                                                            <p> {mess}</p>
                                                        </p>



                                                    ))}






                                                </div>


                                            </Tooltip>



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
                        console.log(msg);
                        this.getReceivedChunk();
                        this.getChunk();
                    }}
                    ref={(client) => { this.clientRef = client }} />
            </div>
        )
    }

}

export default Messages