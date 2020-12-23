import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from "react-router-dom";
import AppPage from "./AppPage";

const USER = gql`
    query GetUser($id: ID!) {
        userById (id: $id) {
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

    const user = data && data.userById;

    return (
        <AppPage title={(user && user.firstname) || 'User'} meta={{ name: '', content: '' }}>
            <div className="user-container paddings">
                <h2>User</h2>

                {
                    (user) && (
                        <div className="form">
                            <div className="field inline">
                                <label>firstname</label>
                                <input type="text" readOnly value={user.firstname}  />
                            </div>
                            <div className="field inline">
                                <label>lastname</label>
                                <input type="text" readOnly value={user.lastname}  />
                            </div>
                            <div className="field inline">
                                <label>email</label>
                                <input type="text" readOnly value={user.email}  />
                            </div>
                        </div>
                    )
                }

                <h2>Associate posts</h2>
                {
                    (user && user.posts.length > 0 ) && (
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
                                user.posts.map((post, index) => {
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
        </AppPage>
    );
}

User.propTypes = {

};

export default User;
