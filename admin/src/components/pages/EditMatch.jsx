import React from 'react'
import Field from '../unit/Field'
import { request } from '../../utils/request'


export default function (props) {

    const [title, setTitle] = React.useState('');
    const [action, setAction] = React.useState('goal');
    const [team, setTeam] = React.useState('');
    const [id, setId] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [videoId, setVideoId] = React.useState('');

    const updateLive = (status) => {
        request({
            route: 'matches/summary/' + id,
            credentials: 'include',
            method: 'PUT',
            body: {
                isLive: status
            }
        })
    }

    const updateVideoId = () => {
        request({
            route: 'matches/' + id,
            credentials: 'include',
            method: 'PUT',
            body: {
                videoId
            }
        })
    } 

    const submitSummary = async (e) => {

        e.target.disbaled = true;

        let res = await request({
            route: 'matches/' + id,
            method: 'PUT',
            credentials: 'include',
            body: {
                action: action.toLocaleLowerCase(),
                team,
            }
        });

        if (res.status == 'success') {
            setMessage('Summary added successfully')
        }
        else {
            setMessage(res.message)
        }

        e.target.disbaled = false;

    }

    return (
        <div className = 'card'>
            <h3 style = {{margin: 0, marginBottom: 10}}>Edit Match</h3>

            <div style={{width: '50%'}}>
                <div>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Match Id"
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
                <h4 style = {{margin: 0, marginBottom: 10}}>Add Summary</h4>
                <div style = {{display: 'inline-block', width: 'calc(50% - 20px)', marginRight: 20}}>
                    <p>Action</p>
                    <select className = 'form-control' onChange={(e) => setAction(e.target.value)}>
                        <option>Goal</option>
                        <option>Foul</option>
                        <option>Break</option>
                    </select>
                </div>
                <div style = {{display: 'inline-block', width: 'calc(50% - 20px)', marginRight: 20}}>
                    <p>Team</p>
                    <input 
                        className="form-control"
                        placeholder="Team Id"
                        onChange={(e) => setTeam(e.target.value)}
                    />
                </div>
                <br />
                <div style = {{display: 'inline-block', width: 'calc(50% - 20px)', marginRight: 20, marginTop: 10}}>
                    <button
                        type = 'button' 
                        value = 'Done'
                        className = 'btn btn-success'
                        onClick = {submitSummary}
                    >
                        <i class="glyphicon glyphicon-ok" style = {{marginRight: 5}}></i>
                        Add to Summary
                    </button>
                    
                </div>
            </div>

            <div style={{ margin: "20px 0px" }}>
                <Field 
                    onChange={(e) => setVideoId(e.target.value)}
                    title="Hightlights/Stream Video Id"
                />
                <div style = {{display: 'inline-block', width: 'calc(50% - 20px)', marginRight: 20, marginTop: 10}}>
                    
                    <button
                        type = 'button' 
                        value = 'Done'
                        className = 'btn btn-success'
                        onClick = {updateVideoId}
                    >
                        <i class="glyphicon glyphicon-ok" style = {{marginRight: 5}}></i>
                        Update Stream/Highlights
                    </button>
                    
                </div>
            </div>
            
            <p>{message}</p>
            <div style = {{marginTop: 15}}>
            <button
                        type = 'button' 
                        value = 'Done'
                        className = 'btn btn-success'
                        onClick = {submitSummary}
                    >
                        <i class="glyphicon glyphicon-ok" style = {{marginRight: 5}}></i>
                        Done
                    </button>
                    <button
                        type = 'button' 
                        value = 'Done'
                        className = 'btn btn-warning'
                        style = {{marginLeft: 10}}
                    >
                        <i class="glyphicon glyphicon-ban-circle" style = {{marginRight: 5}}></i>
                        Cancel
                    </button>
                    <button
                        type = 'button' 
                        style={{marginLeft: 5}}
                        className = 'btn btn-success'
                        onClick = {() => updateLive(true)}
                    >
                        <i class="glyphicon glyphicon-ok" style = {{marginRight: 5}}></i>
                        Match: Live
                    </button>

                    <button
                        type = 'button' 
                        style={{marginLeft: 5}}
                        className = 'btn btn-success'
                        onClick = {() => updateLive(false)}
                    >
                        <i class="glyphicon glyphicon-ok" style = {{marginRight: 5}}></i>
                        Match: Offline
                    </button>
            </div>
        </div>
    );
}