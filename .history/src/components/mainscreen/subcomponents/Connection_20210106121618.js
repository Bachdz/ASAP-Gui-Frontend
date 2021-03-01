import React, { Component } from 'react'
//import css-File
import '../../css/dashboard/Connection.css';
import GroupIcon from '@material-ui/icons/Group';

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