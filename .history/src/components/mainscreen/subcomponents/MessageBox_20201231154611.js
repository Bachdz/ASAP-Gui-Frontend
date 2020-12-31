import React from 'react'

export default function MessageBox(props) {
    onEnterPress = (e) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            this.myFormRef.submit();
        }
    }

    return (
        <div class="message-box">

            <form id={el => this.myFormRef = el} onSubmit={props.createNewMess}>
                <textarea type="text" class="message-input" placeholder="Type message..." onChange={props.getMessValue} onKeyDown={this.onEnterPress}></textarea>
                <button type="submit" class="message-submit" >Add</button>
            </form>
        </div>
    )
}
