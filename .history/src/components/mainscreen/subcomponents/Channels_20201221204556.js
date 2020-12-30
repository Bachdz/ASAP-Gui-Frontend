import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

class Channels extends Component {
    state = {

        open: true,

    }


    render() {
        const { open } = this.state;

        const handleClick = (event, index) => {
            this.setState({ open: !this.state.open });

        };
        return (
            <div>
                <div className="title">
                    < ListItem button onClick={handleClick}>
                        {open ? <ExpandLess /> : <ExpandMore />}
                        <ListItemText primary="Apps" className='parentList' />
                    </ListItem>

                </div>
            </div>
        )
    }
}


export default Channels