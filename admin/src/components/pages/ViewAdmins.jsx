import React from 'react'
import {api} from '../../data/api'
import Viewer from '../../utils/Viewer'
import {request} from '../../utils/request'
import Pager from '../../utils/Pager'

export default function (props) {

    const [data, setData] = React.useState();
    const [error, setError] = React.useState('');
    const [pageSize, setPageSize] = React.useState(3);
    const [startIndex, setStartIndex] = React.useState(0);

    const setPage = (i_) => {
        setStartIndex(--i_ * pageSize)
    }

    const EditAction = (e, data) => {
        props.setBase(data, 'admin', true);
        props.setScreen('EditStaff');
    }

    const deleteAction = async (e, data) => {

        if (! window.confirm('Are you sure you want to delete ' + data.name)) return;

        e.target.disabled = true;
        let res = await request({
            route: 'admins/',
            params: data._id,
            method: 'DELETE',
            credentials: 'include'
        })
        
        if (res.status == 'success') setData('')

    }

    (async () => {

        if (data) return;

        let data_ = await request({
            method: 'GET',
            route: 'admins',
            credentials: 'include'
        })
        
        if (data_.error) {
            setError(data_.message);
            return setData([])
        }

        setData(data_);

    })()

    return (
        <div className = 'card'>
            <h3 style = {{margin: 0, marginBottom: 10}}>
                View Admins
                <span
                    style={{
                        float: 'right'
                    }}
                >
                    <input
                        type = 'button'
                        value = 'Add'
                        className = 'btn btn-success'
                        onClick = {() => props.setScreen('AddStaff')}
                    />
                </span>
            </h3>
            <br />
            {
                error ?
                <p>{error}</p>
                : data ? data.length <= 0 ? 'No Admins Found' :
                <>
                <Viewer 
                    data = {data.data.slice(startIndex, pageSize + startIndex)}
                    hidden = {['_id']}
                    actions = {[
                        {onClick: EditAction, value: 'Edit', className : 'btn btn-primary'},
                        {onClick: deleteAction, value: 'Delete', className : 'btn btn-danger', break: true}
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