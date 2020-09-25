import React, { useState, useEffect } from 'react';
import { addPost } from "../services/PostService";
import '../css/main.css';
import './home.css';

function PostAdd() {
    function onSubmitAddPost(e) {
        e.preventDefault();

        // TODO finir useState()

        addPost({
            title: 'title 2',
            description: 'description 2 ...',
            content: 'content content content 2 2 2...',
            isPrivate: false
        }).then((res) => {
            console.log(res.data);
        });
    }

    return (
        <div>
            Add a post
            <form>
                <div>
                    <label htmlFor="">field 1</label>
                    <input type="text" name="name" value={"toto"}/>
                </div>

                <div>
                    <label htmlFor="">field 2</label>
                    <input type="text" name="name" value={"toto2"}/>
                </div>

                <button onClick={onSubmitAddPost}>Submit</button>
            </form>
        </div>
    );
}

export default PostAdd;
