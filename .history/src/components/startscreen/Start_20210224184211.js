import React from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Footer from './components/fragments/Footer';
import { ReactComponent as Arrow } from '../../arrow.svg';


export default function Start() {
    let history = useHistory();

    const doInitializeApp = () => {
        axios.get('http://localhost:8080/api/v1/asap/start').then(res => {
            if (res.data === true) {
                history.push('/login')
            } else {
                alert.push('something went wrong. Could not start the application')
            }
        })
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
