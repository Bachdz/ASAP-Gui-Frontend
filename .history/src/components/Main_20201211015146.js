import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import '../css/Main.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
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
import { FreeBreakfastRounded } from '@material-ui/icons';



const styles = theme => ({
    listItemText: {
        fontSize: '25px'
    }
});




class Main extends Component {


    state = {
        username: this.props.location.state ? this.props.location.state.peer : "",
        apps: [
            { 'name': 'Chat' },
            { 'name': 'Work' }
        ],
        open: true,
        setOpen: false,
        openAddApp: false,
        activateAddApp: false
    }

    doCreateApp() {
        console.log('create app')
    }

    // componentDidMount() {

    //     if (this.props.location.state !== undefined && this.props.location.state.peer !== undefined) {
    //         this.setState({ username: this.props.location.state.peer });

    //         console.log(this.props.location.state)
    //     }
    // }

    render() {
        const { username, open, openAddApp, activateAddApp } = this.state;

        const { classes } = this.props;

        const handleClick = () => {
            this.setState({ open: !this.state.open })
        };

        const validate = (e) => {
          
            if (e.target.value.length === 0) {
                this.setState({ activateAddApp: false })
            } else if (e.target.value.length > 0) {
                this.setState({ activateAddApp: !this.state.activeAddApp })
            }
        }

        const createNewApp = () => {

            this.setState({ openAddApp: !this.state.openAddApp })
        }
        if (username === undefined || username === "") {
            return <Redirect to="/login" />;
        } else {
            return (
                <div class="main">
                    <div id="bar"></div>
                    <div class="main-content">


                        <section class="navigation">
                            <div class="user-info">
                                <AccountCircleIcon id="accountIcon" />
                           Welcome  <b> {this.state.username}</b>
                                <Link to="/login" className="exit">     <ExitToAppIcon id="exit-icon" className="icon" /> </Link>
                            </div>



                            <div className="main-items">
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
                                                <input type="text" id="addApp" name="appname" className="input" placeholder="Enter app name" onChange={validate} />

                                                {
                                                    activateAddApp ?
                                                        <CheckIcon id="checkicon-activate" className="icon" onClick={this.doCreateApp} />
                                                        :

                                                        <CheckIcon id="checkicon-inactive" />

                                                }



                                            </div>
                                            : null
                                    }

                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                        <List>

                                            {
                                                this.state.apps.map((app) => (

                                                    <ListItem button id="apps" >
                                                        <ListItemText primary={app.name} />
                                                    </ListItem>


                                                ))

                                            }

                                        </List>
                                    </Collapse>
                                </List>
                            </div>
                        </section>
                        <section class="main-screen">


                        </section>

                        <section class="connection-bar">



                        </section>


                    </div>
                </div>
            );
        }



    }
}

export default withStyles(styles, { withTheme: true })(Main);
