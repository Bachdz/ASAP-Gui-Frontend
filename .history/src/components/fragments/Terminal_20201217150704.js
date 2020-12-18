import React from 'react'
import '../../css/Terminal.css';



function Terminal(props) {
    return (
        <div className="console">
            <pre className="i-has-teh-code" id="scrollbar" >
                {props.consolelog.map((string) => (

                    <p>{string}</p>



                ))
                }

            </pre>

        </div>
    )
}
export default Terminal;