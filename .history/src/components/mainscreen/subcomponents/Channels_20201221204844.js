import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

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
class Channels extends Component {


    state = {

        open: true,

    }


    render() {
        const { open } = this.state;
        const { classes } = this.props;

        const handleClick = (event, index) => {
            this.setState({ open: !this.state.open });

        };
        return (
            <div>
                <div className="title">
                    < ListItem button classes={{ primary: classes.listItemText }} onClick={handleClick}>
                        {open ? <ExpandLess /> : <ExpandMore />}
                        <ListItemText primary="Apps" className='parentList' />
                    </ListItem>

                </div>
            </div>
        )
    }
}


export default withStyles(styles, { withTheme: true })(Channels)