import React from 'react'
import {api} from '../../data/api'
import Viewer from '../../utils/Viewer'
import Pager from '../../utils/Pager'
import {request} from '../../utils/request'
import {getTeamById} from '../../utils/getTeams'

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
            route: 'matches/',
            params: data._id,
            method: 'DELETE',
            credentials: 'include'
        })
        if (res.status == 'success') setData([])
    }

    (async () => {

        if (data) return;

        let res = await fetch(api + 'matches');
        let data_ = await res.json();

        data_.data.forEach(match => {
            //post.img = {
            //    type: 'image',
            //    src: post.image
            //}

            match.host = getTeamById(match.host) ? getTeamById(match.host).name : '';
            match.teamA = getTeamById(match.team1) ? getTeamById(match.team1).name : '';
            match.teamB = getTeamById(match.team2) ? getTeamById(match.team2).name : '';

        })

        setData(data_);

    })()

    return (
        <div className = 'card'>
            <h3 style = {{margin: 0, marginBottom: 10}}>
                View Matches
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
                    hidden = {['image', 'summary', 'team1', 'team2']}
                    actions = {[
                        {onClick: deletePage, value: 'Delete', className : 'btn btn-danger margin-5', break: true}
                    ]}
                />
                <div className = 'order-pager-container'>
                    <span style = {{float: 'left'}}>
                        Showing {startIndex + 1} to {(startIndex + 1) * pageSize < data.length ? (startIndex + 1) * pageSize: data.length} of {data.length} entries
                    </span>
                    <Pager 
                        count = {Math.ceil(data.length / pageSize)}
                        setPage = {setPage}
                    />
                </div>
                </>
                : "loading ..."
            }
        </div>
    )

}