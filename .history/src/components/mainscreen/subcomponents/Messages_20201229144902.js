import React, { Component } from 'react'
import '../../../css/mainscreen/Messages.css';
import MessageBox from './MessageBox';


class Messages extends Component {
    render() {
        if (this.props.content.length > 0) {

            return (
                <div>
                    <div className="mess">
                        Messages:
                    {

                            this.props.content.map((mess) => (
                                <p> {mess} </p>
                            ))
                        }
                    </div>
                    <div className="box">
                        <h1>asdsad</h1>
                    </div>
                </div>
            )
        } else {
            return (

                <div className="messages-container">
                    <p>There are currently no messages in this channel</p>
                </div>



            )
        }

    }
}
export default Messages