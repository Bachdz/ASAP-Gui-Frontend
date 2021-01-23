import React, { Component } from 'react'
import '../../css/Terminal.css';



export default class Terminal extends Component {

    state = {
        log: []
    }


    componentDidMount() {

        this.getLog();
    }

    getLog = () => {
        axios.get('http://localhost:8080/api/v1/asap/logdata')
            .then(res => this.setState({ consolelog: res.data }))
    }
    render() {
        return (
            <div className="console">
                <div className="i-has-teh-code" >
                    {props.consolelog.map((string) => (

                        <p>{string}</p>



                    ))
                    }

                </div>

            </div>
        )
    }
}

