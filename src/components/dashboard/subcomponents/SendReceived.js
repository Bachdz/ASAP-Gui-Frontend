import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function SendReceived(props) {
    const [checked, setChecked] = useState();


    useEffect(() => {
        //get status of sendReceived
        const url = 'http://localhost:8080/api/v1/asap/getsendreceived?peer=' + props.userName + '&storage=' + props.appSelectedName;
        axios.get(url).then(res => {
            setChecked(res.data);
        })
    });

    return (
        <p className="toggle-setting">
            <label class="switch">
                <input type="checkbox" defaultChecked={checked} onClick={props.setSendReceived} />
                <span class="slider round"></span>
            </label> Set send received

        </p>
    )
}
