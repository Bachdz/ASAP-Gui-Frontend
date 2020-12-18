import React from 'react'
import '../../css/Terminal.css';



function Terminal(props) {
    return (
        <div className="console">
            <div className="i-has-teh-code" id="scrollbar" >
                {props.consolelog.map((string) => (

                    <p>{string}</p>



                ))
                }

            </div>

        </div>
    )
}
export default Terminal;