import React from 'react'

export default function MessageBox() {
    const setValue = (e) => {
        console.log(e.target.value)
    }
    return (
        <div class="message-box">
            <textarea type="text" class="message-input" placeholder="Type message..." onChange={setValue}></textarea>
            <button type="submit" class="message-submit" >Add</button>
        </div>
    )
}
