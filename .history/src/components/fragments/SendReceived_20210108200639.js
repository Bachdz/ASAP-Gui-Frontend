import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function SendReceived(props) {
    const [checked, setChecked] = useState(false);


    useEffect(() => {
        const url = 'http://localhost:8080/api/v1/asap/getsendreceived?peer=' + props.userName + '&storage=' + props.appSelectedName;
        console.log(url);
        axios.get(url).then(res => {
            setChecked(res.data);
        })
    });


    return (
        <p className="toggle-setting">
            <label class="switch">
                <input type="checkbox" defaultChecked={checked} onChange={props.setSendReceived} />
                <span class="slider round"></span>
            </label> Set send received

        </p>
    )
}
