import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import '../../../css/mainscreen/Channels.css';

const styles = theme => ({
    listItemText: {
        fontSize: '20px'
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

    }

    componentDidMount() {

        axios.get('http://localhost:8080/api/v1/asap/channels?peer=' + this.props.username + '&storage=' + this.props.appName)
            .then(res => this.setState({ channels: res.data }))
    }


    render() {
        const { open } = this.state;
        const { classes } = this.props;

        const handleClick = (event, index) => {
            this.setState({ open: !this.state.open });

        };
        return (
            <div className="channels-container">
                <List>
                    <div className="title">

                        < ListItem button onClick={handleClick}>
                            {open ? <ExpandLess /> : <ExpandMore />}
                            <ListItemText classes={{ primary: classes.listItemText }} primary="Channels" className='parentList' />
                        </ListItem>
                    </div>
                    <div className="channel-list">
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List>

                                {
                                    this.state.channels.map((channel) => (
                                        <ListItem button id="channels" >
                                            <ListItemText primary={channel} />
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