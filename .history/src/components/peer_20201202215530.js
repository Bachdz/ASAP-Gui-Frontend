import React , { Component } from 'react';

class Peer extends Component {
    render() { 
        console.log(this.state.peers)
        return (

            <h1>Please choose a peer</h1>
          );
    }
}
 
export default Peer ;