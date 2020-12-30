import React from 'react'

export default function MessageBox() {
    return (
        <div class="message-box">
            <textarea type="text" class="message-input" placeholder="Type message..."></textarea>
            <button type="submit" class="message-submit">Add</button>
        </div>
    )
}
