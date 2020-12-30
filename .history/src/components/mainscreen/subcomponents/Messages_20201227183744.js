import React, { Component } from 'react'

class Messages extends Component {
    render() {
        return (
            <div>

                {

                    this.props.content.map((mess) => (
                        <p> {mess} </p>
                    ))
                }




            </div>
        )
    }
}
export default Messages