import React from 'react'
import {api} from '../../data/api'
import Viewer from '../../utils/Viewer'
import {request} from '../../utils/request'
import Dispute from './Dispute'

export default function (props) {

    const [data, setData] = React.useState();
    const [disputeId, setDisputeId] = React.useState(null);

    const openDispute = (e, data) => {
        setDisputeId(data._id);
    }
    const EditAction = (e, data) => {
        props.setBase(data, 'page', true);
        props.setScreen('EditPage');
    }

    const deletePage = async (e, data) => {
        e.target.disabled = true;
        let res = await request({
            route: 'contact/',
            params: data._id,
            method: 'DELETE',
            credentials: 'include'
        })
        
        if (res.status == 'success') setData('')

    }

    (async () => {

        if (data) return;

        let res = await fetch(api + 'contact');
        let data_ = await res.json();
        data_.data.forEach(item => {
            item.date = item.createdAt;
        })
        setData(data_);
        props.setBase(data_, 'pages');

    })()

    return (
        <div className = 'card'>
            <div style={{display: disputeId? 'block': 'none'}}>
            <Dispute 
                id={disputeId}
                hide={() => setDisputeId(null)}
            />
            </div>
            <h3 style = {{margin: 0, marginBottom: 10}}>
                View Contacts
                <span
                    style={{
                        float: 'right'
                    }}
                >
                    <input
                        type = 'button'
                        value = 'Add'
                        className = 'btn btn-success'
                        onClick = {() => props.setScreen('AddPage')}
                    />
                </span>
            </h3>
            <br />
            {
                data ?
                <Viewer 
                    data = {data.data}
                    hidden = {['_id', 'messages', 'createdAt', 'updatedAt']}
                    actions = {[
                        {onClick: openDispute, value: 'Reply', className : 'btn btn-primary'},
                    ]}
                />
                : "loading ..."
            }
        </div>
    )

}