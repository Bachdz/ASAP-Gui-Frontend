import React, { Component } from 'react'
import '../../../css/mainscreen/Messages.css';
import MessageBox from './MessageBox';

import axios from 'axios';

class Messages extends Component {
    state = {
        content: [],
        messValue: ''
    }

    componentDidMount() {
        let url = 'http://localhost:8080/api/v1/asap/messages?peer=' + this.props.userName + '&storage=' + this.props.appSelected + '&uri=' + this.props.channelUriSelected;
        console.log(url)
        axios.get(url)
            .then(res => this.setState({ content: res.data }))
    }

    getMessValue = (e) => {
        this.setState({ messValue: e.target.value })
    }

    createNewMess = (e) => {
        console.log("here" + this.state.messValue)

    }



    render() {
        if (this.state.content.length > 0) {

            return (
                <div className="messages-container">
                    <div className="mess">
                        Messages:
                     {

                            this.state.content.map((mess) => (
                                <p> {mess} </p>
                            ))
                        }
                    </div>
                    <div className="box">
                        < MessageBox getMessValue={this.getMessValue} createNewMess={this.createNewMess} />
                    </div>
                </div>
            )
        } else {
            return (

                <div className="messages-container">
                    <div className="mess">

                        <p>There are currently no messages in this channel</p>

                    </div>
                    <div className="box">
                        <MessageBox getMessValue={this.getMessValue} createNewMess={this.createNewMess} />

                    </div>
                </div>



            )
        }

    }
}
export default Messages