import React , { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/Peer.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

class Peer extends Component {
    render() { 
       return (
        this.props.peers.map((peer) => (
            <div className="peer-container">

               <AccountCircleIcon id="icon" /> {peer.name}
                <ArrowForwardIcon id="forward" />
            
            </div>

        ))
       );

    
    }
}


Peer.propTypes = {
    peers: PropTypes.array.isRequired
}
 
export default Peer ;