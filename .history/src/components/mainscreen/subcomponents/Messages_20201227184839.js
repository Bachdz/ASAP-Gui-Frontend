import React, { Component } from 'react'

class Messages extends Component {
    render() {
        if (this.props.content.length > 0) {

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
        } else {
            return (<div></div>)
        }


    }
}
export default Messages