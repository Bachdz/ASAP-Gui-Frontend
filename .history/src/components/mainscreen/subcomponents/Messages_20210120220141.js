import React, { Component } from 'react'
import '../../../css/mainscreen/Messages.css';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

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
                    <div className="mess-content">

                        {this.state.content.length > 0 ?
                            <div className="mess-content">

                                {this.state.content.map((mess) => (
                                    <p> {mess} </p>
                                ))
                                }
                            </div>
                            :
                            <p>There are currently no messages in this channel</p>
                        }



                    </div>
                    <div classNamme="received-content">
                        <div id="inbox-title"></div>




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
            </div>
        )
    }

}

export default Messages