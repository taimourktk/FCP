import React from 'react'
import Field from '../unit/Field'
import CKEditor from 'react-ckeditor-component'
import getUnique from '../../utils/getUnique'
import { request } from '../../utils/request'
import ReactHtmlParser from "react-html-parser";


export default function (props) {

    const isc = props.base.isc.faq || {};

    const [categories, setCategories] = React.useState()
    const [category, setCategory] = React.useState()
    const [status, setStatus] = React.useState()
    const [sortOrder, setSortOrder] = React.useState()
    const [content, setContent] = React.useState()
    const [message, setMessage] = React.useState()
    const [question, setQuestion] = React.useState()
    const [newCategoryDisplay, setNewCategoryDisplay] = React.useState('none')

    const submitFAQ = async (e) => {

        e.target.disbaled = true;

        let res = await request({
            route: 'faqs/',
            method: 'PUT',
            params: isc._id,
            credentials: 'include',
            body: {
                sortOrder,
                answer: content,
                question,
                category
            }
        });

        if (res.status == 'success') {
            setMessage('FAQ updated successfully')
        }
        else {
            setMessage(res.message)
        }

        e.target.disbaled = false;

    }

    const parse = (data) => {
        if (content) {
            return data
        }
        else return ReactHtmlParser(data).join('')
    }

    const handleCategory = (e) => {

        if (e.target.value === '0') {
            setNewCategoryDisplay('inline-block')
        }
        else {
            setNewCategoryDisplay('none')
        }

        setCategory(e.target.value)

    }

    if (props.base.faqs && props.base.faqs.data && ! categories)
        setCategories(getUnique(props.base.faqs.data, 'category'))

    return (
        <div className = 'card'>
            <h3 style = {{margin: 0, marginBottom: 10}}>Edit FAQ</h3>

            <div style = {{display: 'inline-block', width: 'calc(50% - 20px)', marginRight: 20}}>
                <p>FAQ Category</p>
                <select className = 'form-control' onChange = {handleCategory}>
                    <option >Select Category</option>
                    <option selected>{isc.category || 0}</option>
                    {
                        categories ? categories.map(cat => <option>{cat}</option>): ""
                    }
                    <option value = '0'>Other</option>
                </select>
            </div>
            <div style = {{display: newCategoryDisplay, width: 'calc(50% - 20px)', marginRight: 20}}>
                <Field 
                    title = 'New Category'
                    placeholder = 'Type New Category'
                    onChange = {(e) => setCategory(e.target.value)}
                />
            </div>

            {/*<div style = {{display: 'inline-block', width: 'calc(50% - 20px)', marginRight: 20}}>
                <p>Status</p>
                <select className = 'form-control'>
                    <option>Active</option>
                    <option>Inactive</option>
                </select>
                </div>*/}

            <div style = {{verticalAlign: 'top', marginTop: 15, display: 'inline-block', width: 'calc(50% - 20px)', marginRight: 20}}>
                <p>Question</p>
                <textarea 
                    value = {isc.question}
                    onChange = {(e) => {
                        isc.question = e.target.value
                        setQuestion(e.target.value)
                    }}
                    className = 'form-control' 
                    placeholder = 'Enter Question Here'
                ></textarea>
            </div>

            <div style = {{verticalAlign: 'top', marginTop: 15, display: 'inline-block', width: 'calc(50% - 20px)', marginRight: 20}}>
                <Field 
                    title = 'Sort Order'
                    placeholder = 'Sort Order'
                    onChange = {(e) => {
                        setSortOrder(e.target.value)
                        isc.sortOrder = e.target.value
                    }}
                    value = {isc.sortOrder}
                />
            </div>

            <div style = {{marginTop: 15, display: 'inline-block', width: 'calc(50% - 20px)', marginRight: 20}}>
                <p>Answer</p>
                <CKEditor 
                    activeClass="editor" 
                    content = {parse(props.base.isc.faq ? props.base.isc.faq.answer: isc.answer )}
                    events = {{
                        change: (e) => {
                            props.base.isc.faq.answer = e.editor.getData()
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
                        onClick = {submitFAQ}
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