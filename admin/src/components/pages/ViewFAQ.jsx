import React from 'react'
import {api} from '../../data/api'
import Viewer from '../../utils/Viewer'
import {request} from '../../utils/request'

export default function (props) {

    const [data, setData] = React.useState();

    const EditAction = (e, data) => {
        props.setBase(data, 'faq', true);
        props.setScreen('EditFAQ');
    }

    const deleteAction = async (e, data) => {
        e.target.disabled = true;
        let res = await request({
            route: 'faqs/',
            params: data._id,
            method: 'DELETE',
            credentials: 'include'
        })
        
        if (res.status == 'success') setData('')

    }

    (async () => {

        if (data) return;

        let res = await fetch(api + 'faqs');
        let data_ = await res.json();
        setData(data_);
        props.setBase(data_, 'faqs');

    })()

    return (
        <div className = 'card'>
            <h3 style = {{margin: 0, marginBottom: 10}}>
                View FAQs
                <span
                    style={{
                        float: 'right'
                    }}
                >
                    <input
                        type = 'button'
                        value = 'Add'
                        className = 'btn btn-success'
                        onClick = {() => props.setScreen('AddFAQ')}
                    />
                </span>
            </h3>
            <br />
            {
                data ?
                <Viewer 
                    data = {data.data}
                    hidden = {['_id']}
                    actions = {[
                        {onClick: EditAction, value: 'Edit', className : 'btn btn-primary'},
                        {onClick: deleteAction, value: 'Delete', className : 'btn btn-danger', break: true}
                    ]}
                />
                : "loading ..."
            }
        </div>
    )

}