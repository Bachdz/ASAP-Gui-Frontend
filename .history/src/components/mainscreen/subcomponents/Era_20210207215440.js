import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

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
        this.interval = setInterval(async () => {
            await this.getEra();
        }, 1000); // every one second
    }


    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getEra() {
        axios.get('http://localhost:8080/api/v1/asap/era?peer=' + this.props.username + '&storage=' + this.props.appName)
            .then(res => {
                this.setState({ currentEra: res.data })
            })
    }



    render() {
        const { classes } = this.props;


        return (
            <div>
                <ListItem>
                    <ListItemText classes={{ primary: classes.listItemText }} primary={"Current Era: " + this.state.currentEra} className='parentList' />
                </ListItem>

            </div>
        )
    }
}


export default withStyles(styles, { withTheme: true })(Era)
