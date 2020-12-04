import React , { Component } from 'react';

class Peer extends Component {
    render() { 
        return (
        this.props.peers.map((peer) => (
            peer.name
            
        ))
            
          );
    }
}
 
export default Peer ;