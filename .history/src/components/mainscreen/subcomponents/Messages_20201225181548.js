import React, { Component } from 'react'

class Messages extends Component {
    render() {
        return (
            <div>
                <p>Messages:
               {
                        this.props.content.map((mess) => (
                            mess + <br />
                        ))
                    }




                </p>
            </div>
        )
    }
}
export default Messages