import React from 'react'
import Field from '../unit/Field'
import getFormData from '../../utils/getFormData'
import ImageLoader from '../../utils/ImageLoader'
import {request} from '../../utils/request'

export default function (props) {

    const [logo, setLogo] = React.useState('');
    const [banner, setBanner] = React.useState('');
    const [info, setInfo] = React.useState();
    const [message, setMessage] = React.useState('');
    const [invoiceLogo, setInvoiceLogo] = React.useState('');

    if (! info) {
        request({
            route: 'info',
            method: 'GET'
        }).then(d => {
            setInfo(d.data ? d.data[0] || {} : {})
        })
    }

    const handleOnchange = (e) => {

        setInfo({
            ... info,
            [e.target.name]: e.target.value
        })

    }

    const handleForm = async (e) => {
        e.preventDefault();
        let formData = getFormData(e.target)

        if (logo) {

            let res = await request({
                route: 'images',
                method: 'POST',
                body: {
                    base64: logo
                }
            })

            if (res.fileName) {
                formData.logo = res.fileName;
            }

        }

        if (invoiceLogo) {

            let res = await request({
                route: 'images',
                method: 'POST',
                body: {
                    base64: invoiceLogo
                }
            })

            if (res.fileName) {
                formData.invoiceLogo = res.fileName;
            }

        }

        if (banner) {

            let res = await request({
                route: 'images',
                method: 'POST',
                body: {
                    base64: banner
                }
            })

            if (res.fileName) {
                formData.banner = res.fileName;
            }

        }

        //for (let x in formData) {
        //    if (formData[x] == '')
        //        delete formData[x]
        //}

        let res = await request({
            route: 'info',
            params: '/info',
            method: 'PUT',
            credentials: 'include',
            body: formData
        })

        if (res.status == 'success')
            setMessage('Updated Successfully')
        else
            setMessage('Some error occurred')
    }

    const handleImage = (images) => setLogo(images.logo)
    const handleBanner = (images) => setBanner(images.banner)
    const handleInvoiceLogo = (images) => setInvoiceLogo(images.logo)

    return info ?
    (
        <div className = 'card'>
            <div style = {{minWidth: 300, width: '60%'}}>
                <form action ='/' onSubmit = {handleForm}>
                <div style={{display: props.page==='profile' ? 'block': 'none' }}>
                <h3 style = {{margin: 0, marginBottom: 10}}>Company Profile</h3>
                <Field 
                    name = 'name'
                    title = 'Company Name'
                    placeholder = 'Company Name'
                    style = {{marginTop: 10}}
                    value = {info.name}
                    onChange = {handleOnchange}
                />
                <Field 
                    name = 'address'
                    title = 'Address'
                    placeholder = 'Address'
                    style = {{marginTop: 10}}
                    value = {info.address}
                    onChange = {handleOnchange}
                />
                <Field 
                    name = 'city'
                    title = 'City'
                    placeholder = 'City'
                    style = {{marginTop: 10}}
                    value = {info.city}
                    onChange = {handleOnchange}
                />
                <Field 
                    name = 'state'
                    title = 'State'
                    placeholder = 'State'
                    inputType = 'text'
                    style = {{marginTop: 10}}
                    value = {info.state}
                    onChange = {handleOnchange}
                />
                <Field 
                    name = 'zip'
                    title = 'ZIP'
                    placeholder = 'ZIP'
                    inputType = 'text'
                    style = {{marginTop: 10}}
                    value = {info.zip}
                    onChange = {handleOnchange}
                />
                <Field 
                    name = 'telephone'
                    title = 'Telephone'
                    placeholder = 'Telephone'
                    inputType = 'text'
                    style = {{marginTop: 10}}
                    value = {info.telephone}
                    onChange = {handleOnchange}
                />
                </div>
                <div style={{display: props.page==='config' ? 'block': 'none' }}>
                <h2>
                    Website Configuration
                </h2>

                <Field 
                    name = 'domain'
                    title = 'Domain'
                    placeholder = 'Domain'
                    inputType = 'text'
                    style = {{marginTop: 10}}
                    value = {info.domain}
                    onChange = {handleOnchange}
                />
                <Field 
                    name = 'api'
                    title = 'API Link (domain or IP)'
                    placeholder = 'API Link'
                    inputType = 'text'
                    style = {{marginTop: 10}}
                    value = {info.api}
                    onChange = {handleOnchange}
                />
                <Field 
                    name="sendgridKey"
                    title="Sendgrid API Key"
                    placeholder="Sendgrid API Key"
                    inputType="text"
                    style = {{marginTop: 10}}
                    value = {info.sendgridKey}
                    onChange = {handleOnchange}
                />
                <Field 
                    name = 'email'
                    title = 'Email'
                    placeholder = 'Email'
                    inputType = 'email'
                    style = {{marginTop: 10}}
                    value = {info.email}
                    onChange = {handleOnchange}
                />
                <Field 
                    name = 'google'
                    title = 'G PLUS'
                    placeholder = 'Google Plus URL'
                    inputType = 'text'
                    style = {{marginTop: 10}}
                    value = {info.google}
                    onChange = {handleOnchange}
                />
                <Field 
                    name = 'fb'
                    title = 'Facebook Page'
                    placeholder = 'Facebook Page URL here'
                    inputType = 'text'
                    style = {{marginTop: 10}}
                    value = {info.fb}
                    onChange = {handleOnchange}
                />
                <Field 
                    name = 'twitter'
                    title = 'Twitter'
                    placeholder = 'Twitter URL here'
                    inputType = 'text'
                    style = {{marginTop: 10}}
                    value = {info.twitter}
                    onChange = {handleOnchange}
                />
                <Field 
                    name = 'insta'
                    title = 'Instagram Page'
                    placeholder = 'Instagram Page URL here'
                    inputType = 'text'
                    style = {{marginTop: 10}}
                    value = {info.insta}
                    onChange = {handleOnchange}
                />

                <Field 
                    name = 'ppClient'
                    title = 'Paypal Live Client Id'
                    placeholder = 'Paypal Live Client Id here'
                    inputType = 'text'
                    style = {{marginTop: 10}}
                    value = {info.ppClient}
                    onChange = {handleOnchange}
                />
                <Field 
                    name = 'ppSBClient'
                    title = 'Paypal Sandbox Client Id'
                    placeholder = 'Paypal Sandbox Client Id here'
                    inputType = 'text'
                    style = {{marginTop: 10}}
                    value = {info.ppSBClient}
                    onChange = {handleOnchange}
                />
                <Field 
                    name = 'ppCurrency'
                    title = 'Currency'
                    placeholder = 'Enter Currency here'
                    inputType = 'text'
                    style = {{marginTop: 10}}
                    value = {info.ppCurrency}
                    onChange = {handleOnchange}
                />
                <div>
                    <p className = 'field-title'>Paypal Mode</p>
                    <span>
                        <input value = 'on' name = 'ppMode' onChange={handleOnchange} type='radio' name='ppMode' checked={info.ppMode == 'on'} />
                        <label style={{marginLeft: 5}}>Live</label>
                        <input value = 'off' name = 'ppMode' onChange={handleOnchange} type='radio' style={{marginLeft: 5}} name='ppMode' checked={info.ppMode == 'off'} />
                        <label for='ppMode' style={{marginLeft: 5}}>Sandbox</label>
                    </span>
                </div>
                <div style={{marginTop: 10}}>
                    <label>Tawk To Iframe</label>
                    <textarea
                        name = 'tawkto'
                        placeholder = 'Tawk To Iframe'
                        placeholder = 'Enter TawkTo Iframe code which you get from Tawk.to'
                        value = {info.tawkto}
                        onChange={handleOnchange}
                        className='form-control'
                        style={{

                        }}
                    ></textarea>
                </div>

                <div style = {{marginTop: 10}}>
                    <p className = 'field-title'>Maintenance Mode</p>
                    <select className = 'form-control' name="maintenanceMode">
                    <option value={info.maintenanceMode}>{info.maintenanceMode ? 'On' : 'Off'}</option>
                        <option value={true}>On</option>
                        <option value={false}>Off</option>
                    </select>
                </div>

                <div style = {{marginTop: 5}}>
                    <p>Upload Logo</p>
                    <ImageLoader 
                        sizes = {{logo: {minWidthOrHeight: 400}}}
                        setImages = {handleImage}
                    />
                </div>
                <div style = {{marginTop: 5}}>
                    <p>Upload Homepage Banner</p>
                    <ImageLoader 
                        sizes = {{banner: {minWidthOrHeight: 1440}}}
                        setImages = {handleBanner}
                    />
                </div>
                <div style = {{marginTop: 5}}>
                    <p>Upload Invoice Logo</p>
                    <ImageLoader 
                        sizes = {{logo: {minWidthOrHeight: 400}}}
                        setImages = {handleInvoiceLogo}
                    />
                </div>
                </div>

                <p style = {{margin: '5px 0px'}}>
                    {message}
                </p>
                <div style = {{marginTop: 20}}>
                    <button
                        type = 'submit' 
                        value = 'Done'
                        className = 'btn btn-success'
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
                </form>
            </div>
        </div>
    )
    : 'loading ...'

}