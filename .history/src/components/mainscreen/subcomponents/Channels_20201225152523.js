import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CheckIcon from '@material-ui/icons/Check';

import '../../../css/mainscreen/Channels.css';

const styles = theme => ({
    listItemText: {
        fontSize: '20px'
    },
    listItemTextSecondary: {
        color: '#ffffff'
    },
    setSelected: {
        "&.Mui-selected": {
            color: "#F1C653",
            background: "rgb(255 255 255 / 11%)"
        }
    }
});



class Channels extends Component {

    state = {
        channels: [],
        open: true,
        openAddChannel: false,
        activateAddChannel: false,
        openAddChannel: false,
        newChannelUrl: '',
        recipients: ''
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/v1/asap/channels?peer=' + this.props.username + '&storage=' + this.props.appName)
            .then(res => this.setState({ channels: res.data }))
    }

    doCreateChannel = () => {
        // let recipients = this.state.recipients.split(",");
        // let obj = new Object;
        // obj.uri = this.state.newChannelUrl;
        // obj.recipients = recipients;
        console.log(this.state.recipients);
    }



    render() {
        const { open, openAddChannel, activateAddChannel } = this.state;
        const { classes } = this.props;

        const handleClick = (event, index) => {
            this.setState({ open: !this.state.open });

        };

        const toggleCreateNewChannel = () => {
            this.setState({ openAddChannel: !this.state.openAddChannel, activateAddChannel: false, newChannelUrl: '', recipients: '' })
        }

        const validateChannelUrl = (e) => {
            this.setState({ newChannelUrl: e.target.value }, () => validateAddChannel())

        }

        const validateRecipients = (e) => {
            this.setState({ recipients: e.target.value }, () => validateAddChannel())
        }

        const validateAddChannel = () => {
            if (this.state.newChannelUrl.length > 0 && this.state.recipients.length > 0) {
                this.setState({ activateAddChannel: true })
            } else {
                this.setState({ activateAddChannel: false })
            }
        }




        return (
            <div className="channels-container">
                <List>
                    <div className="title">

                        < ListItem button onClick={handleClick}>
                            {open ? <ExpandLess /> : <ExpandMore />}
                            <ListItemText classes={{ primary: classes.listItemText }} primary="Channels" className='parentList' />
                        </ListItem>
                        {
                            openAddChannel ?
                                <RemoveIcon id="removeIcon" className="icon" onClick={toggleCreateNewChannel} />
                                :
                                <AddIcon id="addIcon" className="icon" onClick={toggleCreateNewChannel} />

                        }


                    </div>
                    {
                        openAddChannel ?
                            <div className="addChannel">
                                <input autoComplete="off" type="text" id="addApp" name="channelname" className="input" placeholder="Enter channel uri" onChange={validateChannelUrl} />
                                <input autoComplete="off" type="text" id="recipients" name="recipients" className="input" placeholder="Enter recipients, e.g. Alice,Bob" onChange={validateRecipients} />

                                {
                                    activateAddChannel ?
                                        <CheckIcon id="checkicon-activate" className="icon" onClick={this.doCreateChannel} />
                                        :

                                        <CheckIcon id="checkicon-inactive" />

                                }



                            </div>
                            : null
                    }

                    <div className="channel-list">
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List>

                                {
                                    this.state.channels.length === 0 ?

                                        <p className="information"> There are currently no channels avaiable</p>
                                        :
                                        this.state.channels.map((channel) => (
                                            <ListItem button id="channels" >
                                                <ListItemText classes={{ secondary: classes.listItemTextSecondary }} primary={channel.uri} secondary={channel.recipients.length > 0 ? "Recipients: " + channel.recipients : "Recipients: 0"} />
                                            </ListItem>


                                        ))

                                }

                            </List>
                        </Collapse>
                    </div>
                </List>

            </div>
        )
    }
}


export default withStyles(styles, { withTheme: true })(Channels)