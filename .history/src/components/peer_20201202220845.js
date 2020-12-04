import React , { Component } from 'react';
import '../css/Peer.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

class Peer extends Component {
    render() { 
        {if (this.props.peers.length >0 ) { 


            return (
                this.props.peers.map((peer) => (
                    <div className="peer-container">
                        <AccountCircleIcon id="icon"/>
                        {peer.name}
                        <ArrowForwardIcon id="forward"/>
                    </div>
                    
                ))
                    
                  );


        }     else {
            return (
                <h1>alo</h1>
            )
        }    }

       
                
    }
}
 
export default Peer ;