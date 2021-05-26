import React from 'react'
import Field from '../unit/Field'
import {api} from '../../data/api'

export default function () {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('')

    const login = async (e) => {
        try {
            e.target.disabled = true;

            let res = await fetch(api + 'admins/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            let data = await res.json();

            if (data.status === 'fail') {
                e.target.disabled = false;
                setMessage(data.message);
            }
            else {
                localStorage.setItem('admin_token', data.token);
                localStorage.setItem('admin', JSON.stringify(data.data));
                document.cookie = 'jwt=' + data.token;
                document.cookie = 'type=admin';
                window.location.reload();
            }

        }
        catch (err) {
            e.target.disabled = false;
        }
    }

    return (
        <center>
            <div style = {{textAlign: 'left', marginTop: '10%', width: 350, padding: 10}}>
                <h3 style = {{marginBottom: 15}}>Login</h3>
                <Field 
                    inputType = 'text'
                    placeholder = 'Username'
                    onChange = {(e) => setUsername(e.target.value)}
                />
                <Field 
                    inputType = 'password'
                    placeholder = 'Password'
                    onChange = {(e) => setPassword(e.target.value)}
                />
                <p style = {{fontSize: 13, margin: 0, marginTop: 10}}>
                    {message}
                </p>
                <input
                    type = 'button'
                    value = 'Login'
                    className = 'btn btn-primary'
                    style = {{marginTop: 15, float: 'right'}}
                    onClick = {login}
                />
            </div>
        </center>
    )
}