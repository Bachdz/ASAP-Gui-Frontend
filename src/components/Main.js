import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import '../css/Main.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
class Main extends Component {
    

    state = {
        username: this.props.location.state ? this.props.location.state.peer : "",
        app: [
          { 'name': 'Chat'},
          { 'name': 'Work'}
        ],
        open : false,
        setOpen: false
    
    }

    // componentDidMount() {

    //     if (this.props.location.state !== undefined && this.props.location.state.peer !== undefined) {
    //         this.setState({ username: this.props.location.state.peer });

    //         console.log(this.props.location.state)
    //     }
    // }
    
    render() {  
        const { username, open, setOpen } = this.state;
        const useStyles = makeStyles((theme) => ({
            root: {
              width: '100%',
              maxWidth: 360,
              backgroundColor: theme.palette.background.paper,
            },
            nested: {
              paddingLeft: theme.spacing(4),
            },
          }));
          
    
          
            const handleClick = () => {
              this.setState({open : !this.state.open})
            };
        if (username === undefined || username === "") {
            return <Redirect to="/login" />;
        } else {
            return (
                <div class="main">
                    <div id="bar"></div>
                    <div class="main-content">


                        <section class="navigation">
                            <div class="user-info">
                        <AccountCircleIcon id="icon" />
                           Welcome  <b> {this.state.username}</b>
                           <Link to="/login" className ="exit">     <ExitToAppIcon id="exit-icon" /> </Link>
                            </div>

                            <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          ASAP v.0.1
        </ListSubheader>
      }
    >
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="App" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Chat" />
          </ListItem>
        </List>
      </Collapse>
    </List>

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

export default Main;
