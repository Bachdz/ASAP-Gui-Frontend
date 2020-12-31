import React, { Component } from 'react'
import '../../../css/mainscreen/Messages.css';
import MessageBox from './MessageBox';

import axios from 'axios';
import { Message } from '@material-ui/icons';

class Messages extends Component {
    state = {
        content: [],
        messValue: '',
        resetMessValue: false,
        resetMess: '',

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
        e.preventDefault();
        console.log(this.state.messValue)
        this.setState({ resetMessValue: !this.state.resetMessValue })
    }
    render() {
        return (
            <div className="messages-container">
                <div className="mess">
                    {this.state.content.length > 0 ?
                        <div>
                            <p>Messages:</p>

                            {this.state.content.map((mess) => (
                                <p> {mess} </p>
                            ))
                            }
                        </div>
                        :
                        <p>There are currently no messages in this channel</p>
                    }
                </div>
                <div className="box">
                    <div class="message-box">

                        <form>
                            <textarea type="text" class="message-input" placeholder="Type message..."></textarea>

                            <button type="submit" class="message-submit" >Add</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default Messages