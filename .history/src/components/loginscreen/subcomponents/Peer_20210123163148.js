import React from 'react';
import '../../../css/loginscreen/Peer.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
// import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Peer(props) {

    if (props.peers.length > 0) {
        return (
            <div className="peer-container">
                {
                    props.peers.map((peer) => (
                        <div id="peer">
                            <AccountCircleIcon id="icon-login" />
                            {peer.name}
                            <Link to={{
                                pathname: '/main/user',
                                state: {
                                    peer: peer.name
                                }
                            }}>
                                <ArrowForwardIcon id="forward" />
                            </Link>
                        </div>

                    ))
                }
            </div>


        );


    } else {
        return (
            <h3>There are no peers available</h3>
        )
    }
}





export default Peer;