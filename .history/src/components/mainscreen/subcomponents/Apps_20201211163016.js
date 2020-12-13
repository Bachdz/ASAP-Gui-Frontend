import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CheckIcon from '@material-ui/icons/Check';

import '../../../css/mainscreen/Apps.css';


const styles = theme => ({
    listItemText: {
        fontSize: '25px'
    }
});



class Apps extends Component {
    state = {
        newApp: '',
        open: true,
        setOpen: false,
        openAddApp: false,
        activateAddApp: false
    }


    render() {
        const { open, openAddApp, activateAddApp , newApp} = this.state;
        const { classes } = this.props;

        const handleClick = () => {
            this.setState({ open: !this.state.open })
        };

        const validate = (e) => {

            if (e.target.value.length === 0) {
                this.setState({ activateAddApp: false })
            } else if (e.target.value.length > 0) {
                this.setState({ activateAddApp: !this.state.activeAddApp, newApp: e.target.value})
            }
        }

        const createNewApp = () => {

            this.setState({ openAddApp: !this.state.openAddApp , activateAddApp: false})
        }

        return (
            <div>
                <List>
                    <div className="title">
                        <ListItem button onClick={handleClick}>
                            {open ? <ExpandLess /> : <ExpandMore />}
                            <ListItemText primary="Apps" classes={{ primary: classes.listItemText }} className='parentList' />
                        </ListItem>

                        {
                            openAddApp ?
                                <RemoveIcon id="removeIcon" className="icon" onClick={createNewApp} />
                                :
                                <AddIcon id="addIcon" className="icon" onClick={createNewApp} />

                        }
                    </div>
                    {
                        openAddApp ?
                            <div className="add">
                                <input autoComplete="off" type="text" id="addApp" name="appname" className="input" placeholder="Enter app name" onChange={validate} />

                                    {
                                        activateAddApp ?
                                            <CheckIcon id="checkicon-activate" className="icon" onClick={this.props.doCreateApp.bind(this, newApp)} />
                                            :

                                            <CheckIcon id="checkicon-inactive" />

                                    }

                                

                            </div>
                            : null
                    }

                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List>

                            {
                                this.props.apps.map((app) => (

                                    <ListItem button id="apps" >
                                        <ListItemText primary={app.name} />
                                    </ListItem>


                                ))

                            }

                        </List>
                    </Collapse>
                </List>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Apps);