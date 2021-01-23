import React from 'react'
import '../../css/Terminal.css';



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

