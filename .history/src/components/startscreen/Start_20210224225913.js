import React from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Footer from '../fragments/Footer';
import { ReactComponent as Arrow } from '../../arrow.svg';


export default function Start() {
    let history = useHistory();

    const doInitializeApp = () => {
        axios.get('http://localhost:8080/api/v1/asap/start')
            .then(res => {
                if (res.data == true) {
                    console.log("comehere")
                    history.push('/login')
                } else {
                    alert('something went wrong. Could not start the application')
                }
            }).catch(err => {
                alert('something went wrong. Could not contact the server!')
            });
    }


    return (
        <div>
            <div className="container">

                <div className="content">
                    <div id="box">
                        <h1>Welcome to ASAP engine</h1>
                        <Arrow id="next" onClick={doInitializeApp} />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
