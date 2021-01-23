import React, { Component } from 'react'
import '../../css/Terminal.css';


import axios from 'axios';

export default class Terminal extends Component {

    state = {
        log: []
    }


    componentDidMount() {
        this.getLog();
    }

    getLog = () => {
        axios.get('http://localhost:8080/api/v1/asap/logdata')
            .then(res => this.setState({ log: res.data }))
    }
    render() {
        return (
            <div className="console">
                <div className="i-has-teh-code" >
                    {this.state.log.map((string) => (

                        string
                    ))
                    }

                </div>

            </div>
        )
    }
}

