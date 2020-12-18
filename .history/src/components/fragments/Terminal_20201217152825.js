import React, { useRef } from 'react'
import '../../css/Terminal.css';



function Terminal(props) {
    const scrollbar = useRef(null);
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
export default Terminal;