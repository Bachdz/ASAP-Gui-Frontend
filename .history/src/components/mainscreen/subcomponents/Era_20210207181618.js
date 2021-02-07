import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import SockJsClient from 'react-stomp';

const styles = theme => ({
    listItemText: {
        fontSize: '20px'
    }
});


class Era extends Component {
    state = {
        currentEra: ''
    }



    componentDidMount() {
        this.getEra();
    }

    getEra() {
        axios.get('http://localhost:8080/api/v1/asap/era?peer=' + this.props.username + '&storage=' + this.props.appName)
            .then(res => {
                this.setState({ currentEra: res.data })
            })
    }



    render() {
        const { classes } = this.props;
        const channelListener = "/received/app/" + this.props.appName;
        return (
            <div>
                <ListItem>
                    <ListItemText classes={{ primary: classes.listItemText }} primary={"Current Era: " + this.state.currentEra} className='parentList' />
                </ListItem>



                <SockJsClient url='http://localhost:8080/websocket/'
                    topics={[channelListener]}

                    onConnect={() => {
                        console.log("connected to websocket and listen to era change on " + channelListener)
                    }}

                    onDisconnect={() => {
                        console.log("disconnected to websocket listener on " + channelListener)
                    }}

                    onMessage={(msg) => {
                        console.log(msg);
                        this.getEra();
                    }}
                    ref={(client) => { this.clientRef = client }} />
            </div>
        )
    }
}


export default withStyles(styles, { withTheme: true })(Era)
