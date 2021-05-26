import React from 'react'
import Field from '../unit/Field'
import ImageLoader from '../../utils/ImageLoader'
import { request } from '../../utils/request'
import { api } from '../../data/api'
import {categories} from '../../data/post.res'

function duplicateExists(w){
    return new Set(w).size !== w.length 
}

function PostInput (props) {

    const setImage = (data, meta) => props.onChange({... data, index: props.index}, meta);

    return (
        <div>
            <div style = {{display: 'inline-block', verticalAlign: 'top', width: 'calc(50% - 10px)', padding: 10, paddingLeft: 0}}>
                
                <div style = {{marginTop: 10}}>
                    <p>Select Image Type</p>
                    <select class = 'form-control' onChange = {(e) => props.setType(e.target.value, props.index)}>
                        <option></option>
                        <option value = 'portrait' >Portrait</option>
                        <option value = 'landscape' >Landscape</option>
                    </select>
                </div>
            </div>
            <div style = {{display: 'inline-block', verticalAlign: 'top', width: 'calc(50% - 20px)', padding: 10, height: '100%'}}>
                <p>Upload an Image</p>
                <ImageLoader 
                    sizes = {{original: 'original', thumb: {maxWidthOrHeight: 450}}}
                    setImages = {setImage}
                />
            </div>
        </div>
    )

}

export default function (props) {
    let postData = props.base.isc.post ? props.base.isc.post : {};

    const handleImagesAndThumbs = ({original, thumb, index}, meta) => {
        let thumbs_ = thumbs;
        thumbs_[index] = thumb;
        setThumbs(thumbs_);
        let images_ = images;
        images_[index] = original;
        imagesNames[index] = meta.name;
        setImages(images_);
        setImagesNames(imagesNames);
    }

    const handleSize = (value, index) => {
        sizes[index] = value;
        setSizes(sizes)
    }

    const handleType = (value, index) => {
        types[index] = value;
        setTypes(types)
    }

    const [id, setId] = React.useState('');
    const [name, setName] = React.useState(postData.name);
    const [category, setCategory] = React.useState('');
    const [tags, setTags] = React.useState(postData.tags);
    const [tagsView, setTagsView] = React.useState();
    const [tagsString, setTagsString] = React.useState('');
    const [images, setImages] = React.useState([])
    const [thumbs, setThumbs] = React.useState([]);
    const [types, setTypes] = React.useState([]);
    const [sizes, setSizes] = React.useState([]); 
    const [imagesNames, setImagesNames] = React.useState([]);
    const [message, setMessage] = React.useState('')
    const [typeOfUse, setTypeOfUse] = React.useState(postData.typeOfUse);
    const [typeOfUseView, setTypeOfUseView] = React.useState();
    const [typeOfUseString, setTypeOfUseString] = React.useState('');
    const [ImageInputs, setImageInputs] = React.useState([])
    const [previousItems, setPreviousItems] = React.useState();

    React.useEffect(() => {
    })

    const handleTags = (e) => {

        let tags_ = e.target.value.split(' ').filter((tag) => tag !== ' ' && tag !== '');
        console.log(tags_)
        let tagsHtml = []
        tags_.map(tag => {
            tagsHtml.push(<span style = {{margin: 3, marginLeft: 0, borderRadius: 3, padding: 4, background: 'grey', color: 'white', fontSize: 12}}>{tag}</span>)
        })

        setTagsString(e.target.value);
        setTags(tags_);
        setTagsView(tagsHtml)
    }

    const handleTypeOfUse = (e) => {

        let tags_ = e.target.value.split(' ').filter((tag) => tag !== ' ' && tag !== '');
        let tagsHtml = []
        tags_.map(tag => {
            tagsHtml.push(<span style = {{margin: 3, marginLeft: 0, borderRadius: 3, padding: 4, background: 'grey', color: 'white', fontSize: 12}}>{tag}</span>)
        })

        setTypeOfUseString(e.target.value);
        setTypeOfUse(tags_);
        setTypeOfUseView(tagsHtml);
    }

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const isTypeExists = (type) => {
        for (let i = 0; postData.items && i < postData.items.length; i++) {
            if (type === postData.items[i].type)
                return true;
        }
        return false;
    }

    const submitPost = async (e) => {
        try {
            e.target.disabled = true;
            let toSkip = []
            let postData = [];

            setMessage('Saving Images ....')

            for (let i = 0; i < ImageInputs.length; i++) {
                if (! thumbs[i]) {
                    toSkip.push(i);
                    continue;
                }
                if (isTypeExists(types[i])) {
                    alert(types[i] + " is already present. Remove the current image to add new");
                    setMessage('');
                    return e.target.disabled = false;
                }
            }

            for (let i = 0; i < ImageInputs.length; i++) {

                if (toSkip.indexOf(i) !== -1) continue
                let thumbInfo = await request({
                    route: 'images',
                    method: 'POST',
                    body: {
                        base64: thumbs[i],
                        ref: i
                    }
                })

                setMessage('Saved Thumb # ' + i)

                let imageInfo = await request({
                    route: 'images',
                    method: 'POST',
                    body: {
                        base64: images[i],
                        ref: i
                    }
                })

                setMessage('Saved Image # ' + i)

                postData.push({
                    image: imageInfo.fileName,
                    thumb: thumbInfo.fileName,
                    filename: imagesNames[i],
                    size: 'xxx',
                    type: types[i]
                })

            }

            let items_ = postData.concat(previousItems || [])

            let data = await request({
                route: 'posts/' + id,
                method: 'PUT',
                credentials: 'include',
                body: {
                    name,
                    typeOfUse,
                    category,
                    items: items_,
                    tags
                }
            });

            if (data.status === 'success') {
                setMessage('Post added successfully');
            }

            setImageInputs([])
            setImageInputs([]);
            setTagsView([]);

            e.target.disabled = false;
        }
        catch (err) {
            e.target.disabled = false;
        }
    }

    if (! tagsView && postData.tags) {
        handleTags({target: {value: postData.tags ? postData.tags.join(' '): ''}});
    }

    if (! typeOfUse && postData.typeOfUse) {
        handleTypeOfUse({target: {value: postData.typeOfUse ? postData.typeOfUse.join(' '): ''}});
    }

    if (!id && postData._id) {
        setId(postData._id);
    }

    if (!name && postData.name) {
        setName(postData.name)
    }
    if (!name && postData.category) {
        setCategory(postData.category)
    }

    if (!previousItems && postData.items) {
        setPreviousItems(postData.items);
    }

    return (
        <div className = 'card'>
            <h3 style = {{margin: 0, marginBottom: 15}}>Add a Post</h3>
            <Field 
                name={"name"}
                title="Name"
                placeholder="Name of the template"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <div>
                <p className = 'field-title'>Category</p>
                <select className='form-control' name='category' onChange={(e) => setCategory(e.target.value)}>
                    
                    <option value='other'></option>
                    {
                        categories.map((cat) => (
                            <option value={cat[1]} selected={cat[1] === category}>
                                {cat[0]}({cat[1]})
                            </option>
                        ))
                    }
                </select>
            </div>
            <Field 
                name="typeOfUse"
                title="Type of Use"
                placeholder="Type of Use"
                value={typeOfUseString}
                onChange={handleTypeOfUse}
            />
            <p style = {{margin: 5, marginBottom: 10}}>
                {typeOfUseView}
            </p>
            <Field 
                name = 'tags'
                title = 'Add Tags'
                placeholder = 'Separate Tags using Space'
                onChange = {handleTags}
                value = {tagsString}
            />
            
            <p style = {{margin: 5, marginBottom: 10}}>
                {tagsView}
            </p>

            <p style={{marginTop: 20}}>Previously Added Photos</p>
            {
                postData.items && postData.items.map((item, index) => {
                    return item ?
                     (
                        <div style = {{display: 'inline-block', verticalAlign: 'top', padding: 5, border: '1px solid lightgrey', marginRight: 5}}>
                            <img src={api + 'images/' +item.thumb} style={{height: 200, minWidth: 120}}/>
                            <p>{item.type + " - " + item.size}</p>
                            <button 
                                className='btn btn-danger'
                                onClick = {
                                    () => {
                                        postData.items.splice(index, 1); 
                                        setPreviousItems([... postData.items]);
                                        forceUpdate();
                                    }
                                }
                            >Remove</button>
                        </div>
                    )
                    : null
                })
            }

            {ImageInputs}
            <p style = {{marginTop: 10}}>
                {message}
            </p>
            <div style = {{marginTop: 20}}>
                <input
                    type = 'button'
                    value = 'Post'
                    className = 'btn btn-success'
                    onClick = {submitPost}
                />
                <input
                    type = 'button'
                    value = 'Add More Images'
                    className = 'btn btn-primary'
                    style = {{marginLeft: 10}}
                    onClick = {() => {
                        let a = [ ... ImageInputs];
                        a.push(<PostInput index = {ImageInputs.length} onChange = {handleImagesAndThumbs} setType = {handleType} setSize = {handleSize} />)
                        setImageInputs(a)
                    }}
                />
            </div>
        </div>
    )
}