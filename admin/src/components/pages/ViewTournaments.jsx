import React from 'react'
import {api} from '../../data/api'
import Viewer from '../../utils/Viewer'
import Pager from '../../utils/Pager'
import {request} from '../../utils/request'

export default function (props) {

    const [data, setData] = React.useState();
    const [pageSize, setPageSize] = React.useState(10);
    const [startIndex, setStartIndex] = React.useState(0);

    const setPage = (i_) => {
        setStartIndex(--i_ * pageSize)
    }

    const deleteTournament = async (e, data) => {
        e.target.disabled = true;
        let res = await request({
            route: 'tournaments/',
            params: data._id,
            method: 'DELETE',
            credentials: 'include'
        })
        if (res.status == 'success') setData('')
    }

    const approveTournament = async (e, data) => {
        e.target.disabled = true;
        let res = await request({
            route: 'tournaments/',
            params: data._id,
            method: 'PATCH',
            credentials: 'include',
            body: {
                approved: true
            }
        })
        e.target.disabled = false;
    }

    (async () => {

        if (data) return;

        let res = await fetch(api + 'tournaments');
        let data_ = await res.json();

        data_.data.forEach(post => {
            
        })

        setData(data_);
        props.setBase(data_, 'tournaments');

    })()

    return (
        <div className = 'card'>
            <h3 style = {{margin: 0, marginBottom: 10}}>
                View Tournaments
            </h3>
            <br />
            {
                data ?
                <>
                <Viewer 
                    data = {data.data.slice(startIndex, pageSize + startIndex)}
                    hidden = {['_id', 'image']}
                    actions = {[
                        {onClick: approveTournament, value: 'Approve', className : 'btn btn-primary margin-5'},
                        {onClick: deleteTournament, value: 'Delete', className : 'btn btn-danger margin-5', break: true}
                    ]}
                />
                <div className = 'order-pager-container'>
                    <span style = {{float: 'left'}}>
                        Showing {startIndex + 1} to {(startIndex + 1) * pageSize < data.data.length ? (startIndex + 1) * pageSize: data.data.length} of {data.data.length} entries
                    </span>
                    <Pager 
                        count = {Math.ceil(data.data.length / pageSize)}
                        setPage = {setPage}
                    />
                </div>
                </>
                : "loading ..."
            }
        </div>
    )

}