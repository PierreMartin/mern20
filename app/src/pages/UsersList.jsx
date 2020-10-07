import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';
import AppPage from "./AppPage";
import '../css/main.less';

const USERS = gql`
    query GetUsers {
        users {
            id
            firstname
            lastname
            email
        }
    }
`;

function UsersList() {
    const { loading, error, data, refetch } = useQuery(USERS);
    // OR =>   const [getUsers, { loading, data }] = useLazyQuery(USERS);  <button onClick={ (getUsers()) } />

    useEffect(() => {
        refetch();
    }, []);

    if (loading) return <div className="paddings">Loading...</div>;
    if (error) return <div className="paddings">Error :(</div>;

    return (
        <AppPage title="List of users" meta={{ name: '', content: '' }}>
            <div className="users-list-container paddings">
                <h2>List of users</h2>

                {
                    (data && data.users && data.users.length > 0 ) && (
                        <table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Email</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                data.users.map((user, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1} <Link to={`/user/${user.id}`}>See detail</Link></td>
                                            <td>{user.firstname}</td>
                                            <td>{user.lastname}</td>
                                            <td>{user.email}</td>
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

UsersList.propTypes = {

};

export default UsersList;
