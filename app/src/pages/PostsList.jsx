import React, { useState, useEffect } from 'react';
import { getAllPosts } from "../services/PostService";
import '../css/main.css';
import './postslist.css';

function PostsList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getAllPosts().then((res) => {
            setPosts(res.data);
        });
    }, []);

    return (
        <div className="posts-list-container paddings">
            <h2>List of posts</h2>

            {
                (posts.length > 0 ) && (
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Content</th>
                                <th>Is private</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts.map((post, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{post.title}</td>
                                            <td>{post.description}</td>
                                            <td>{post.content}</td>
                                            <td><input type="checkbox" checked={post.isPrivate} readOnly /></td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                )
            }
        </div>
    );
}

PostsList.propTypes = {

};

export default PostsList;
