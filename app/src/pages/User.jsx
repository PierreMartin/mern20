import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from "react-router-dom";
import '../css/main.less';

const USER = gql`
    query GetUser($id: ID!) {
        user (id: $id) {
            firstname
            lastname
            email
            posts {
                id
                title
                description
                content
                isPrivate
            }
        }
    }
`;

function User() {
    const { id } = useParams(); // get params url
    const { loading, error, data, refetch } = useQuery(USER, {
        variables: { id }
    });

    useEffect(() => {
        refetch();
    }, []);

    if (loading) return <div className="paddings">Loading...</div>;
    if (error) return <div className="paddings">Error :(</div>;

    return (
        <div className="user-container paddings">
            <h2>User</h2>

            {
                (data && data.user) && (
                    <div className="form">
                        <div className="field inline">
                            <label>firstname</label>
                            <input type="text" readOnly value={data.user.firstname}  />
                        </div>
                        <div className="field inline">
                            <label>lastname</label>
                            <input type="text" readOnly value={data.user.lastname}  />
                        </div>
                        <div className="field inline">
                            <label>email</label>
                            <input type="text" readOnly value={data.user.email}  />
                        </div>
                    </div>
                )
            }

            <h2>Associate posts</h2>
            {
                (data && data.user && data.user.posts.length > 0 ) && (
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
                            data.user.posts.map((post, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1} {/*<Link to={`/post/${post.id}`}>See detail</Link>*/}</td>
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

User.propTypes = {

};

export default User;
