import React, { useEffect } from 'react'
import {request} from '../../utils/request'

import Field from '../unit/Field'

const PRIVILIGES = Object.freeze({
    'cb-super-admin': 'superadmin',
    'cb-user': 'user',
    'cb-page': 'page',
    'cb-faq': 'faq',
    'cb-blog': 'blog',
    'cb-post': 'post',
    'cb-order': 'order',
    'cb-coupon': 'coupon',
    'cb-info': 'info',
    'cb-price': 'price'
});

export default function (props) {

    const isc = props.base.isc.admin || {}

    const [formData, setFormData] = React.useState({});
    const [priviliges, setPriviliges] = React.useState([]);

    React.useEffect(() => {
        setPriviliges(isc.privileges || [])
    }, [isc.privileges])

    const [role, setRole] = React.useState('admin')
    const [name, setName] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmedPassword, setConfirmedPassword] = React.useState('')
    const [message, setMessage] = React.useState('');

    const addUser = async (e) => {

        setMessage('Updating ...')
        
        let res = await request({
            route: 'admins/',
            credentials: 'include',
            method: 'PUT',
            params: isc._id,
            body: {
                privileges: priviliges,
                role: (role || isc.role),
                name: (name || isc.name),
                email: (email || isc.email),
                username: (email || isc.username),
            }
        })

        if (res.status == 'success')
            setMessage('Admin updated successfully')
        
        else {
            if (res.error.code === 11000) {
                setMessage('Username is already taken')
            }
            else {
                setMessage(res.error.message)
            }
        }

    }
    
    const getChecked = property => {
        return isc.privileges ? (isc.privileges.indexOf(property) > -1 ? true : false) : false
    }

    const handleRoles = async (e) => {
        let isChecked = e.target.checked;
        let id_ = e.target.id;
        let privilige = PRIVILIGES[id_];
        console.log(priviliges)

        if (isChecked && priviliges.indexOf(privilige) === -1) {
            priviliges.push(privilige)
            await setPriviliges(priviliges);
        }
        else {
            priviliges.splice(priviliges.indexOf(privilige), 1);
            await setPriviliges(priviliges);
        }

        setFormData({ ... formData, priviliges});
    }
    
    return (
        <div className = 'card'>
            <div className = 'card-body'>
                <h4>Add Staff</h4>
                <div style = {{marginTop: 15, width: 'calc(50% - 20px)', marginRight: 20, display: 'inline-block'}}>
                    <p className = 'field-title'>Role</p>
                    <select class="form-control" onChange = {(e) => setRole(e.target.value)}>
                        <option selected>{isc.role}</option>
                        <option value = 'admin'>Admin</option>
                        <option value = 'superadmin'>Super Admin</option>
                    </select>
                </div>
                
                <Field 
                    name = 'name'
                    type = 'text'
                    value = {isc.name}
                    placeholder = 'Name'
                    onChange = {(e) => {
                        isc.name = e.target.value
                        setName(e.target.value)
                    }}
                    title = 'Name'
                    style = {{marginTop: 15, width: 'calc(50% - 20px)', marginRight: 20, display: 'inline-block'}}
                />
                <Field 
                    name = 'username'
                    type = 'text'
                    placeholder = 'Username'
                    value = {isc.username}
                    onChange = {(e) => {
                        isc.username = e.target.value;
                        setUsername(e.target.value)
                    }}
                    title = 'Username'
                    style = {{marginTop: 15, width: 'calc(50% - 20px)', marginRight: 20, display: 'inline-block'}}
                />
                <Field 
                    name = 'email'
                    type = 'email'
                    placeholder = 'Email'
                    title = 'Email'
                    value = {isc.email}
                    onChange = {(e) => {
                        isc.email = e.target.value
                        setEmail(e.target.value)
                    }}
                    style = {{marginTop: 15, width: 'calc(50% - 20px)', marginRight: 20, display: 'inline-block'}}
                />

                <h5 style = {{marginTop: 20}}>Access</h5>
                {/*<div style = {{minWidth: 140, display: 'inline-block'}}>
                    <input type = 'checkbox' id = 'cb-super-admin' onClick = {handleRoles} />
                    <label for = 'cb-super-admin' style = {{fontWeight: 'normal', verticalAlign: 'top', marginLeft: 5}}>Super Admin</label>
                </div>*/}
                <div style = {{minWidth: 140, display: 'inline-block'}}>
                    <input type = 'checkbox' checked = {getChecked('user')} id = 'cb-user' onClick = {handleRoles} />
                    <label for = 'cb-user' style = {{fontWeight: 'normal', verticalAlign: 'top', marginLeft: 5}}>Staff</label>
                </div>
                <div style = {{minWidth: 140, display: 'inline-block'}}>
                    <input type = 'checkbox' checked = {getChecked('page')} id = 'cb-page' onClick = {handleRoles} />
                    <label for = 'cb-page' style = {{fontWeight: 'normal', verticalAlign: 'top', marginLeft: 5}}>Pages</label>
                </div>
                <div style = {{minWidth: 140, display: 'inline-block'}}>
                    <input type = 'checkbox' checked = {getChecked('blog')} id = 'cb-blog' onClick = {handleRoles} />
                    <label for = 'cb-blog' style = {{fontWeight: 'normal', verticalAlign: 'top', marginLeft: 5}}>Blogs</label>
                </div>
                <div style = {{minWidth: 140, display: 'inline-block'}}>
                    <input type = 'checkbox' checked = {getChecked('faq')} id = 'cb-faq' onClick = {handleRoles} />
                    <label for = 'cb-faq' style = {{fontWeight: 'normal', verticalAlign: 'top', marginLeft: 5}}>FAQs</label>
                </div>
                <div style = {{minWidth: 140, display: 'inline-block'}}>
                    <input type = 'checkbox' checked = {getChecked('order')} id = 'cb-order' onClick = {handleRoles} />
                    <label for = 'cb-order' style = {{fontWeight: 'normal', verticalAlign: 'top', marginLeft: 5}}>Orders</label>
                </div>
                <div style = {{minWidth: 140, display: 'inline-block'}}>
                    <input type = 'checkbox' checked = {getChecked('price')} id = 'cb-price' onClick = {handleRoles} />
                    <label for = 'cb-price' style = {{fontWeight: 'normal', verticalAlign: 'top', marginLeft: 5}}>Price & Fee</label>
                </div>
                <div style = {{minWidth: 140, display: 'inline-block'}}>
                    <input type = 'checkbox' checked = {getChecked('info')} id = 'cb-info' onClick = {handleRoles} />
                    <label for = 'cb-info' style = {{fontWeight: 'normal', verticalAlign: 'top', marginLeft: 5}}>Company Profile</label>
                </div>
                <div style = {{minWidth: 140, display: 'inline-block'}}>
                    <input type = 'checkbox' checked = {getChecked('coupon')} id = 'cb-coupon' onClick = {handleRoles} />
                    <label for = 'cb-coupon' style = {{fontWeight: 'normal', verticalAlign: 'top', marginLeft: 5}}>Coupons</label>
                </div>
                <div style = {{marginTop: 10}}>
                    {message}
                </div>
                <div style = {{marginTop: 20}}>
                    <button
                        type = 'button' 
                        value = 'Done'
                        className = 'btn btn-success'
                        onClick = {addUser}
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
        </div>
    )

}