import React from 'react'

export default function MessageBox() {
    state = {

    }
    const setValue = (e) => {
        console.log(e.target.value)
    }
    return (
        <div class="message-box">
            <textarea type="text" class="message-input" placeholder="Type message..." onChange={setValue.bind(this)}></textarea>
            <button type="submit" class="message-submit" onClick={this.props.doCreateMessage.bind(this)}>Add</button>
        </div>
    )
}
