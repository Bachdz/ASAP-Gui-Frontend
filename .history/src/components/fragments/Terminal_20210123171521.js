import React from 'react'
import '../../css/Terminal.css';


import React, { Component } from 'react'

export default class Terminal extends Component {



    render() {
        return (
            <div className="console">
                <div className="i-has-teh-code" ref={scrollbar} >
                    {props.consolelog.map((string) => (

                        <p>{string}</p>



                    ))
                    }

                </div>

            </div>
        )
    }
}

