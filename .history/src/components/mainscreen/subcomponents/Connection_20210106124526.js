import React, { Component } from 'react';
//import css-File
import GroupIcon from '@material-ui/icons/Group';
import CachedIcon from '@material-ui/icons/Cached';
import '../../../css/mainscreen/Connection.css';

class Connection extends Component {
    render() {
        return (
            <div className="connection-menu">
                <div className="connection">
                    <p id="title">   <GroupIcon id="icon" /> Available connections</p>
                    <p className="connection-information">  No available connections</p>
                    <CachedIcon id="refresh-icon" />
                </div>
                <div className="setting">

                </div>
            </div>
        )
    }
}



export default Connection