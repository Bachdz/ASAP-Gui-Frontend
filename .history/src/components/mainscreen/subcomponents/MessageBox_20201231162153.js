import { RecentActors } from '@material-ui/icons';
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
                {this.props.resetMessValue ?
                    <textarea type="text" class="message-input" placeholder="Type message..." onChange={props.getMessValue} onKeyDown={onEnterPress}></textarea>
                    :
                    <textarea type="text" class="message-input" placeholder="Type message..." onChange={props.getMessValue} onKeyDown={onEnterPress}></textarea>

                }
                <button type="submit" class="message-submit" >Add</button>
            </form>
        </div>
    )
}
