import React from 'react';
import { gql, useQuery } from "@apollo/client";
import '../css/main.css';
import './postslist.css';

const POSTS = gql`
    query GetPosts {
        posts {
            id
            title
            description
            content
            isPrivate
        }
    }
`;

function PostsList() {
    const { loading, error, data } = useQuery(POSTS);
    // OR =>   const [getPosts, { loading, data }] = useLazyQuery(POSTS);  <button onClick={ (getPosts()) } />

    if (loading) return <div className="paddings">Loading...</div>;
    if (error) return <div className="paddings">Error :(</div>;

    return (
        <div className="posts-list-container paddings">
            <h2>List of posts</h2>

            {
                (data && data.posts && data.posts.length > 0 ) && (
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
                                data.posts.map((post, index) => {
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
