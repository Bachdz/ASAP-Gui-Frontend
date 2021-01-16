import React, { Component } from 'react';
//import css-File
import GroupIcon from '@material-ui/icons/Group';
import '../../../css/mainscreen/Connection.css';

class Connection extends Component {
    render() {
        return (
            <div className="connection-menu">
                <div className="connection">
                    <GroupIcon id="icon" /> Available Connection

                </div>
                <div className="setting">

                </div>
            </div>
        )
    }
}



export default Connection