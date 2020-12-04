import React , { Component } from 'react';
import '../css/Peer.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

class Peer extends Component {
    render() { 
        return (
        this.props.peers.map((peer) => (
            <div className="peer-container">
                <AccountCircleIcon id="icon"/>
                {peer.name}

            </div>
            
        ))
            
          );
    }
}
 
export default Peer ;