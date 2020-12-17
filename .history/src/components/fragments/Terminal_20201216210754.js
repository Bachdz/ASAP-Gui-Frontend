import React from 'react'
import '../../css/Terminal.css';



function Terminal(props) {
    return (
        <div className="console">
            <pre className="i-has-teh-code" >
                {props.consolelog.map((string) => {

                    string



                }
                )
                }

            </pre>

        </div>
    )
}
export default Terminal;