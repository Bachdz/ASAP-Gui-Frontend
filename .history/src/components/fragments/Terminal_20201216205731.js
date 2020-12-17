import React from 'react'
import '../../css/Terminal.css';



function Terminal(props) {
    return (
        <div className="console">
            <pre className="i-has-teh-code" >
                {props.consolelog.array.forEach(element => {
                    element
                })

                }
            </pre>

        </div>
    )
}
export default Terminal;