import React, { useEffect } from 'react';
import { gql, useQuery } from "@apollo/client";
import AppPage from "./AppPage";
import './dashboard.less';

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

function Dashboard() {
    const { loading, error, data, refetch } = useQuery(POSTS);
    // OR =>   const [getPosts, { loading, data }] = useLazyQuery(POSTS);  <button onClick={ (getPosts()) } />

    useEffect(() => {
        refetch();
    }, []);

    if (loading) return <div className="paddings">Loading...</div>;
    if (error) return <div className="paddings">Error :(</div>;

    return (
        <AppPage title="Dashboard" meta={{ name: '', content: '' }}>
            <div className="dashboard-container paddings">
                <h2>Dashboard</h2>

                <button onClick={() => refetch()}>Refresh datas</button>

                {
                    (data && data.posts && data.posts.length > 0) && (
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
        </AppPage>
    );
}

Dashboard.propTypes = {

};

export default Dashboard;
