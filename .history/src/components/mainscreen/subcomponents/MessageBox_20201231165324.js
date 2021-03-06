import React, { useState } from 'react'

export default function MessageBox(props) {

    const [text, setText] = useState('default')

    const onEnterPress = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            props.createNewMess(e)
        }
    }
    const textOnChange = (e) => {
        setText(setText(e.target.value))
        console.log('val', text);
    }
    const keyD = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            setText('')
        }
    }

    return (
        <div class="message-box">

            <form onSubmit={props.createNewMess}>
                {/*     {props.resetMessValue ?
                    <textarea value={props.resetMess} name="1" type="text" class="message-input" placeholder="Type message..." onChange={props.getMessValue} onKeyDown={onEnterPress}></textarea>
                    :
                    <textarea type="text" class="message-input" placeholder="Type message..." onChange={props.getMessValue} onKeyDown={onEnterPress}></textarea>

                } */}
                <textarea value={text} name="1" type="text" class="message-input" placeholder="Type message..." onChange={textOnChange} onKeyDown={keyD}></textarea>

                <button type="submit" class="message-submit" >Add</button>
            </form>
        </div>
    )
}
