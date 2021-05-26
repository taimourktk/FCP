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

    const deletePage = async (e, data) => {
        e.target.disabled = true;
        let res = await request({
            route: 'news/',
            params: data._id,
            method: 'DELETE',
            credentials: 'include'
        })
        if (res.status == 'success') setData('')
    }

    const EditAction = async (e, _data, index) => {
        props.setBase(data.data[index], 'post', true);
        props.setScreen('EditPost');
    }

    (async () => {

        if (data) return;

        let res = await fetch(api + 'teams');
        let data_ = await res.json();

        data_.data.forEach(post => {
            post.img = {
                type: 'image',
                src: 'https://i.pinimg.com/originals/b3/62/68/b362686170e30ca7ee9a0f9ebe4a2d1d.gif'
            }
        })

        setData(data_);

    })()

    return (
        <div className = 'card'>
            <h3 style = {{margin: 0, marginBottom: 10}}>
                View Teams
                <span
                    style={{
                        float: 'right',
                        display: 'none'
                    }}
                >
                    <input
                        type = 'button'
                        value = 'Add'
                        className = 'btn btn-success'
                        onClick = {() => props.setScreen('AddNews')}
                    />
                </span>
            </h3>
            <br />
            {
                data ?
                <>
                <Viewer 
                    data = {data.data.slice(startIndex, pageSize + startIndex)}
                    hidden = {['_id', 'image', 'rejectedMatchesRequest', 'matchesRequest']}
                    actions = {[
                        {onClick: deletePage, value: 'Delete', className : 'btn btn-danger margin-5', break: true}
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