import React from 'react'
import { api } from '../../data/api'
import Viewer from '../../utils/Viewer'
import {request} from '../../utils/request'

export default function (props) {

    const [data, setData] = React.useState();

    (async () => {

        if (data) return;

        let res = await fetch(api + 'feedback');
        let data_ = await res.json();
        setData(data_);
    })()

    return (
        <div className = 'card'>
            <h3 style = {{margin: 0, marginBottom: 10}}>
                View Feedbacks
            </h3>
            <br />
            {
                data ?
                <Viewer 
                    data = {data.data}
                    hidden = {['_id']}
                />
                : "loading ..."
            }
        </div>
    )

}