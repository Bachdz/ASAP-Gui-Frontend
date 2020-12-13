import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';

import Apps from './subcomponents/Apps';

//import css-File
import '../../css/mainscreen/Main.css';





class Main extends Component {


    state = {
        username: this.props.location.state ? this.props.location.state.peer : "",
        apps: [
            { 'name': 'Chat' },
            { 'name': 'Work' }
        ],
        open: true,
        setOpen: false,
        openAddApp: false,
        activateAddApp: false
    }

    doCreateApp() {
        console.log('create app')
    }

    // componentDidMount() {

    //     if (this.props.location.state !== undefined && this.props.location.state.peer !== undefined) {
    //         this.setState({ username: this.props.location.state.peer });

    //         console.log(this.props.location.state)
    //     }
    // }

    render() {
        const { username } = this.state;

        
        if (username === undefined || username === "") {
            return <Redirect to="/login" />;
        } else {
            return (
                <div class="main">
                    <div id="bar"></div>
                    <div class="main-content">


                        <section class="navigation">
                            <div class="user-info">
                                <AccountCircleIcon id="accountIcon" />
                           Welcome  <b> {this.state.username}</b>
                                <Link to="/login" className="exit">     <ExitToAppIcon id="exit-icon" className="icon" /> </Link>
                            </div>



                            <div className="main-items">

                                <Apps apps={this.state.apps} doCreateApp={this.doCreateApp}/>



                         
                            </div>
                        </section>
                        <section class="main-screen">


                        </section>

                        <section class="connection-bar">



                        </section>


                    </div>
                </div>
            );
        }



    }
}




export default Main;