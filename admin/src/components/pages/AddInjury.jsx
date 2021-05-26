import React from 'react'
import Field from '../unit/Field'
import { request } from '../../utils/request'
import CKEditor from 'react-ckeditor-component'

export default function (props) {

    const [title, setTitle] = React.useState('')
    const [content, setContent] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [videoId, setVideoId] = React.useState('')

    const submitNews = async (e) => {

        e.target.disbaled = true;

        let res = await request({
            route: 'injury',
            method: 'POST',
            credentials: 'include',
            body: {
                title,
                videoId,
                description,
                content
            }
        });

        if (res.status == 'success') {
            setMessage('Injury added successfully')
        }
        else {
            setMessage(res.message)
        }

        e.target.disbaled = false;

    }

    return (
        <div className = 'card'>
            <h3 style = {{margin: 0, marginBottom: 10}}>Add Injury</h3>

            <div style = {{verticalAlign: 'top', marginTop: 15, display: 'inline-block', width: 'calc(50% - 20px)', marginRight: 20}}>
                <p>Title</p>
                <textarea onChange = {(e) => setTitle(e.target.value)} className = 'form-control' placeholder = 'Enter Title Here'></textarea>
            </div>

            <div style = {{marginTop: 15, display: 'inline-block', width: 'calc(50% - 20px)', marginRight: 20}}>
                <p>Description</p>
                <textarea 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="form-control"
                    placeholder="Injury Description here"
                />
            </div>

            <div style = {{verticalAlign: 'top', marginTop: 15, display: 'inline-block', width: 'calc(50% - 20px)', marginRight: 20}}>
                <Field 
                    title = 'Youtube Video Id'
                    placeholder = 'Youtube Video Id'
                    onChange = {(e) => setVideoId(e.target.value)}
                />
            </div>

            <div style = {{marginTop: 15, display: 'inline-block', width: 'calc(50% - 20px)', marginRight: 20}}>
                <p>Content</p>
                <CKEditor 
                    activeClass="editor" 
                    content = {content}
                    events = {{
                        change: (e) => {
                            setContent(e.editor.getData())
                        }
                    }}
                    style = {{marginTop: 10}}
                />
            </div>

            <p>{message}</p>
            <div style = {{marginTop: 15}}>
            <button
                        type = 'button' 
                        value = 'Done'
                        className = 'btn btn-success'
                        onClick = {submitNews}
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