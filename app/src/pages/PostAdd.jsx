import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
// import { addPost } from "../services/PostService";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { notification } from "antd";
import AppPage from "./AppPage";

const ADD_POST = gql`
    mutation AddPost($data: DataInput_addPost) {
        addPost(data: $data) {
            id
            title
            description
            content
            isPrivate
            userId
        }
    }
`;

function PostAdd({ me }) {
    const [fieldsTyping, setFieldsTyping] = useState({});
    const [addPost, { /*data, */loading: mutationLoading, error: mutationError }] = useMutation(ADD_POST);

    if (mutationLoading) return <div className="paddings">Creating...</div>;
    if (mutationError) return <div className="paddings">Error at creating : {mutationError.message}</div>;

    function onInputChange(e) {
        setFieldsTyping({...fieldsTyping, [e.target.name]: e.target.value});
    }

    function onCheckboxChange(e) {
        setFieldsTyping({...fieldsTyping, [e.target.name]: e.target.checked});
    }

    function onSubmitAddPost(e) {
        e.preventDefault();

        if (fieldsTyping.title) {
            fieldsTyping.userId = me && me._id; // For entité liée

            addPost({
                variables: {
                    data: fieldsTyping
                }
            }).then((res) => {
                if (res && res.data && res.data.addPost) {
                    notification['success']({
                        message: 'Success',
                        description: 'You have created a new post.'
                    });

                    setFieldsTyping({});
                }
            });

            /* No Apollo/GraphQl :
            addPost(fieldsTyping).then((res) => {
               console.log(res && res.data);
                setFieldsTyping({});
           });
           */
        }
    }

    return (
        <AppPage title="Add a post" meta={{ name: '', content: '' }}>
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
        </AppPage>
    );
}

PostAdd.propTypes = {
    me: PropTypes.any
};

function mapStateToProps(state) {
    return {
        me: state.user.me
    };
}

export default connect(mapStateToProps, null)(PostAdd);
