import React, { Component } from 'react'
import '../../../css/mainscreen/Messages.css';
import MessageBox from './MessageBox';

import axios from 'axios';
import { Message } from '@material-ui/icons';

class Messages extends Component {
    state = {
        content: [],
        messValue: '',
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
        this.setState({ messValue: '' })
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