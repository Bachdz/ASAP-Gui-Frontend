import React, { Component } from 'react'

class Messages extends Component {
    render() {
        this.props.content.length > 0 ?

        return (
            <div>
                Messages:
                {

                    this.props.content.map((mess) => (
                        <p> {mess} </p>
                    ))
                }




            </div>

        )
            :
        return null

    }
}
export default Messages