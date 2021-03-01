import React from 'react';
import '../../../css/loginscreen/Peer.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Arrow from '@material-ui/icons/ArrowForward';
import { Link } from 'react-router-dom';

function Peer(props) {
    if (props.peers.length > 0) {
        return (
            <div className="peer-container" id="scroll-peers">
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
                                <Arrow id="forward" />
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