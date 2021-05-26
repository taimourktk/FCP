import React, {useState} from 'react'
import Field from '../unit/Field'
import { request } from '../../utils/request'


export default function (props) {

    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [location, setLocation] = useState('');
    const [rate, setRate] = useState('');
    const [availableHours, setAvailableHours] = useState('');
    const [message, setMessage] = useState('')

    const submit = async (e) => {

        e.target.disbaled = true;

        let res = await request({
            route: 'ground',
            method: 'POST',
            credentials: 'include',
            body: {
                name,
                city,
                location,
                rate,
                availableHours: availableHours.split(',').map(hour => Number(hour))
            }
        });

        if (res.status == 'success') {
            setMessage('Ground added successfully')
        }
        else {
            setMessage(res.message)
        }

        e.target.disbaled = false;

    }

    return (
        <div className = 'card'>
            <h3 style = {{margin: 0, marginBottom: 10}}>Add Ground</h3>

            <div style = {{verticalAlign: 'top', marginTop: 15, display: 'inline-block', width: 'calc(50% - 20px)', marginRight: 20}}>
                <Field 
                    title="Ground Name"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div style = {{marginTop: 15, display: 'inline-block', width: 'calc(50% - 20px)', marginRight: 20}}>
                <Field 
                    title="Rate"
                    type="number"
                    onChange={(e) => setRate(e.target.value)}
                />
            </div>

            <div style = {{marginTop: 15, display: 'inline-block', width: 'calc(50% - 20px)', marginRight: 20}}>
                <Field 
                    title="Location"
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>

            <div style = {{marginTop: 15, display: 'inline-block', width: 'calc(50% - 20px)', marginRight: 20}}>
                <Field 
                    title="City"
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>

            <div style = {{marginTop: 15, display: 'inline-block', width: 'calc(50% - 20px)', marginRight: 20}}>
                <Field 
                    title="Available Hours"
                    placeholder="Should be from 0-23 e.g 0,1,2"
                    value={availableHours}
                    onChange={(e) => {
                        let error = e.target.value
                                    .split(',')
                                    .some(hour => {
                                        return isNaN(hour) && Number(hour) < 24 && Number(hour) >= 0
                                    });
                        if (error) {
                            return alert("Hour should be numbers between 0-23")
                        }
                        setAvailableHours(e.target.value);
                    }}
                />
            </div>

            <div style = {{verticalAlign: 'top', marginTop: 15, display: 'inline-block', width: 'calc(50% - 20px)', marginRight: 20}}>
                
            </div>

            <p>{message}</p>
            <div style = {{marginTop: 15}}>
            <button
                        type = 'button' 
                        value = 'Done'
                        className = 'btn btn-success'
                        onClick = {submit}
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
            </div>
        </div>
    );
}