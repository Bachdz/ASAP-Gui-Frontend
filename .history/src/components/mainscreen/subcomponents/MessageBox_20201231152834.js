import React from 'react'

export default function MessageBox(props) {


    return (
        <div class="message-box">
            <textarea type="text" class="message-input" placeholder="Type message..." onChange={props.getMessValue.bind(this)}></textarea>
            <button type="submit" class="message-submit" >Add</button>
        </div>
    )
}
