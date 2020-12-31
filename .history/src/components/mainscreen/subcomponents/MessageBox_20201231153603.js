import React from 'react'

export default function MessageBox(props) {


    return (
        <div class="message-box">
            <textarea type="text" class="message-input" placeholder="Type message..." onChange={props.getMessValue}></textarea>
            <button type="submit" class="message-submit" onSubmit={props.createNewMess} >Add</button>
        </div>
    )
}
