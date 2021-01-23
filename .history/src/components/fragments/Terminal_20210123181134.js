import React, { Component } from 'react'
import '../../css/Terminal.css';
import { animateScroll } from "react-scroll";





import axios from 'axios';

export default class Terminal extends Component {

    state = {
        log: []
    }


    componentDidMount() {
        this.getLog();
        this.interval = setInterval(async () => {
            await this.getLog();
        }, 100); // every one second
    }

    componentDidUpdate() {
        animateScroll.scrollToBottom({
            containerId: "scroll-terminal"
        })

    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getLog = () => {
        console.log("getting log")
        axios.get('http://localhost:8080/api/v1/asap/logdata')
            .then(res => this.setState({ log: res.data }))
    }
    render() {
        return (
            <div className="console" >
                <div className="i-has-teh-code" id="scroll-terminal" >
                    {this.state.log.map((string) => (

                        <p>{string}</p>
                    ))
                    }

                </div>

            </div>
        )
    }
}

