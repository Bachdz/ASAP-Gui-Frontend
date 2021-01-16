import React, { Component } from 'react';
//import css-File
import GroupIcon from '@material-ui/icons/Group';
import CachedIcon from '@material-ui/icons/Cached';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import '../../../css/mainscreen/Connection.css';

class Connection extends Component {
    state = {
        openAddConnection: false,
        activateAddConnection: false,
        newConnection: ''
    }


    render() {
        const { openAddConnection, activateAddConnection } = this.state;

        const createNewConnection = () => {

            this.setState({ openAddConnection: !this.state.openAddConnection })
        }


        const validate = (e) => {

            if (e.target.value.length === 0) {
                this.setState({ activateAddConnection: false })
            } else if (e.target.value.length > 0) {
                this.setState({ activateAddConnection: true, newConnection: e.target.value })
            }
        }
        return (
            <div className="connection-menu">
                <div className="connection">
                    <p id="title">   <GroupIcon id="icon" /> Available connections</p>
                    <p className="connection-information">  No available connections</p>
                    <CachedIcon id="refresh-icon" />
                </div>
                <div className="setting">
                    <p id="open-connection">
                        Open a connection
                        {
                            openAddConnection ?
                                <RemoveIcon id="removeIcon" className="icon" onClick={createNewConnection} />
                                :
                                <AddIcon id="addIcon" className="icon" onClick={createNewConnection} />

                        }


                    </p>
                    {
                        openAddConnection ?
                            <div className="add">
                                <input autoComplete="off" type="text" id="addConnection" name="connectionID" className="input" placeholder="Enter app name" onChange={validate} />

                                {
                                    activateAddConnection ?
                                        <CheckIcon id="checkicon-activate" className="icon" />
                                        :

                                        <CheckIcon id="checkicon-inactive" />

                                }



                            </div>
                            : null
                    }


                </div>
            </div>
        )
    }
}



export default Connection