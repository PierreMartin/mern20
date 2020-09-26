import React, { useState } from 'react';
import { addPost } from "../services/PostService";
import '../css/main.css';

function PostAdd() {
    const [fieldsTyping, setFieldsTyping] = useState({});

    function onInputChange(e) {
        setFieldsTyping({...fieldsTyping, [e.target.name]: e.target.value});
    }

    function onCheckboxChange(e) {
        setFieldsTyping({...fieldsTyping, [e.target.name]: e.target.checked});
    }

    function onSubmitAddPost(e) {
        e.preventDefault();

        if (fieldsTyping.title) {
            addPost(fieldsTyping).then((res) => {
               console.log(res && res.data);
           });
        }
    }

    return (
        <div className="post-add-container paddings">
            <h2>Add a post</h2>

            <form className="form" onSubmit={onSubmitAddPost}>
                <div className="field">
                    <label htmlFor="title">Title <span className="required">*</span></label>
                    <input type="text" name="title" value={fieldsTyping.title || ''} onChange={onInputChange} required />
                </div>
                <div className="field">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" value={fieldsTyping.description || ''} onChange={onInputChange} />
                </div>
                <div className="field">
                    <label htmlFor="content">Content</label>
                    <textarea name="content" value={fieldsTyping.content || ''} onChange={onInputChange} />
                </div>
                <div className="field inline">
                    <label htmlFor="isPrivate">isPrivate</label>
                    <input type="checkbox" id="isPrivate" name="isPrivate" checked={!!fieldsTyping.isPrivate} onChange={onCheckboxChange}  />
                </div>

                <button>Submit</button>
            </form>
        </div>
    );
}

export default PostAdd;
