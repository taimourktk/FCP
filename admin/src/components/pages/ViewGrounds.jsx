import React from 'react'
import {api} from '../../data/api'
import Viewer from '../../utils/Viewer'
import Pager from '../../utils/Pager'
import {request} from '../../utils/request'

export default function (props) {

    const [data, setData] = React.useState();
    const [pageSize, setPageSize] = React.useState(10);
    const [startIndex, setStartIndex] = React.useState(0);
    const [bookings, setBookings] = React.useState(null);

    const setPage = (i_) => {
        setStartIndex(--i_ * pageSize)
    }

    const deletePage = async (e, data) => {
        e.target.disabled = true;
        let res = await request({
            route: 'ground/',
            params: data._id,
            method: 'DELETE',
            credentials: 'include'
        })
        if (res.status == 'success') setData(null)
    }

    const showBookings = (e, data) => {
        setBookings(data.bookings);
    }

    (async () => {

        if (data) return;

        let res = await fetch(api + 'ground');
        let data_ = await res.json();

        setData(data_);

    })()

    if (bookings) {
        
        if (bookings.length > 0 && !bookings[0].date)
            bookings[0].date = '.';

        return (
            <>
                <div style={{ marginBottom: 10 }}>
                    <input 
                        type="button"
                        value="Back"
                        onClick={() => setBookings(null)}
                        className="btn btn-warning"
                    />
                    <span style={{ marginLeft: 10 }}>Bookings</span>
                </div>
                <Viewer 
                    data = {bookings}
                    hidden = {['_id']}
                />
            </>
        )
    }

    return (
        <div className = 'card'>
            <h3 style = {{margin: 0, marginBottom: 10}}>
                View Grounds
                <span
                    style={{
                        float: 'right',
                    }}
                >
                    <input
                        type = 'button'
                        value = 'Add'
                        className = 'btn btn-success'
                        onClick = {() => props.setScreen('AddGround')}
                    />
                </span>
            </h3>
            <br />
            {
                data ?
                <>
                <Viewer 
                    data = {data.data.slice(startIndex, pageSize + startIndex)}
                    hidden = {['_id', 'bookings',]}
                    actions = {[
                        {onClick: showBookings, value: 'Bookings', className : 'btn btn-success margin-5', break: true},
                        {onClick: deletePage, value: 'Delete', className : 'btn btn-danger margin-5', break: true}
                    ]}
                />
                <div className = 'order-pager-container'>
                    <span style = {{float: 'left'}}>
                        Showing {startIndex + 1} to {(startIndex + 1) * pageSize < data.length ? (startIndex + 1) * pageSize: data.length} of {data.length} entries
                    </span>
                    <Pager 
                        count = {Math.ceil(data.data?.length / pageSize)}
                        setPage = {setPage}
                    />
                </div>
                </>
                : "loading ..."
            }
        </div>
    )

}