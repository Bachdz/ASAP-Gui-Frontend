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
                {props.resetMessValue ?
                    <textarea name="1" type="text" class="message-input" placeholder="Type message..." onChange={props.getMessValue} onKeyDown={onEnterPress}></textarea>
                    :
                    <textarea type="text" class="message-input" placeholder="Type message..." onChange={props.getMessValue} onKeyDown={onEnterPress}></textarea>

                }
                <button type="submit" class="message-submit" >Add</button>
            </form>
        </div>
    )
}
