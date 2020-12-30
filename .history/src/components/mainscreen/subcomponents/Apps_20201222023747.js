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
import Channels from './Channels';
import '../../../css/mainscreen/Apps.css';


const styles = theme => ({
    listItemText: {
        fontSize: '25px'
    },
    setSelected: {
        "&.Mui-selected": {
            color: "#F1C653",
            background: "rgb(255 255 255 / 11%)"
        }
    }
});



class Apps extends Component {
    state = {
        newApp: '',
        appName: '',
        open: true,
        setOpen: false,
        openAddApp: false,
        activateAddApp: false,
        selectedIndex: Number,
        deselect: false,
        showChannel: false
    }


    render() {
        const { open, openAddApp, activateAddApp, newApp, selectedIndex, showChannel, deselect } = this.state;
        const { classes } = this.props;

        const handleClick = (event, index) => {
            this.setState({ open: !this.state.open });

        };
        const handleListItemClick = (event, index) => {
            this.setState({
                selectedIndex: index,
                deselect: !deselect
            })
            this.setState({ appName: this.props.apps[index].name, showChannel: !showChannel });
        };

        const validate = (e) => {

            if (e.target.value.length === 0) {
                this.setState({ activateAddApp: false })
            } else if (e.target.value.length > 0) {
                this.setState({ activateAddApp: !this.state.activeAddApp, newApp: e.target.value })
            }
        }

        const createNewApp = () => {

            this.setState({ openAddApp: !this.state.openAddApp, activateAddApp: false })
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
                    <div className="app-list">
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List>

                                {
                                    this.props.apps.map((app, index) => (
                                        <ListItem selected={selectedIndex === index && deselect === true} className={selectedIndex === index && deselect === true ? classes.setSelected : null} onClick={(event) => handleListItemClick(event, index)} button id="apps" >
                                            <ListItemText primary={app.name} />
                                        </ListItem>


                                    ))

                                }

                            </List>
                        </Collapse>
                    </div>
                </List>
                {
                    showChannel ?

                        <Channels appName={this.state.appName} />
                        :
                        null

                }


            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Apps);