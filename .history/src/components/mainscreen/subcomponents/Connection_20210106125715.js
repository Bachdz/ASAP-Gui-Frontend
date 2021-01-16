import React, { Component } from 'react';
//import css-File
import GroupIcon from '@material-ui/icons/Group';
import CachedIcon from '@material-ui/icons/Cached';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import '../../../css/mainscreen/Connection.css';

class Connection extends Component {
    state = {
        openAddConnection: false
    }


    render() {
        const { openAddConnection } = this.state;

        const createNewConnection = () => {

            this.setState({ openAddConnection: !this.state.openAddApp })
        }
        return (
            <div className="connection-menu">
                <div className="connection">
                    <p id="title">   <GroupIcon id="icon" /> Available connections</p>
                    <p className="connection-information">  No available connections</p>
                    <CachedIcon id="refresh-icon" />
                </div>
                <div className="setting">
                    <p>
                        Open a connection
                        {
                            openAddConnection ?
                                <RemoveIcon id="removeIcon" className="icon" onClick={createNewConnection} />
                                :
                                <AddIcon id="addIcon" className="icon" onClick={createNewConnection} />

                        }


                    </p>
                </div>
            </div>
        )
    }
}



export default Connection