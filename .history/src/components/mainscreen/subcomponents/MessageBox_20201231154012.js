import React from 'react'

export default function MessageBox(props) {


    return (
        <div class="message-box">

            <form onSubmit={props.createNewMess}>
                <textarea type="text" class="message-input" placeholder="Type message..." onChange={props.getMessValue}></textarea>
                <button type="submit" class="message-submit" >Add</button>
            </form>
        </div>
    )
}
