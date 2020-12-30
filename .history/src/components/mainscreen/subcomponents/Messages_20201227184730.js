import React, { Component } from 'react'

class Messages extends Component {
    render() {
        this.props.content.length > 0 ?


            <div>
                Messages:
                    {

                    this.props.content.map((mess) => (
                        <p> {mess} </p>
                    ))
                }




            </div>


            :
            <div></div>



    }
}
export default Messages