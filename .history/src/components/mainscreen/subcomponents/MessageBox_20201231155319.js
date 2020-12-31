import React from 'react'

export default function MessageBox(props) {
    const onEnterPress = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            props.createNewMess(e)
        }
    }

    return (
        <div class="message-box">

            <form id={el => this.myFormRef = el} onSubmit={props.createNewMess}>
                <textarea red="input" type="text" class="message-input" placeholder="Type message..." onChange={props.getMessValue} onKeyDown={onEnterPress}></textarea>
                <button type="submit" class="message-submit" >Add</button>
            </form>
        </div>
    )
}
