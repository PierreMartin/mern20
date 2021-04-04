import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { useQuery, gql } from '@apollo/client';
import AppPage from './AppPage';

const { Meta } = Card;

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

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

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
            <div id="users-list-container" className="container paddings">
                <h2>List of users</h2>

                {
                    (data?.users?.length > 0) && (
                        <List
                            grid={{
                                gutter: 16
                            }}
                            pagination={{
                                onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 10
                            }}
                            dataSource={data?.users}
                            renderItem={(user) => (
                                <List.Item>
                                    <Link to={`/user/${user.id}`}>
                                        <Card
                                            style={{ width: 300 }}
                                            hoverable
                                            cover={
                                                <img
                                                    alt="example"
                                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                                />
                                            }
                                            actions={[
                                                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                                            ]}
                                        >
                                            <Meta
                                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                                title={`${user.firstname} ${user.lastname}`}
                                                description={user.email}
                                            />
                                        </Card>
                                    </Link>
                                </List.Item>
                            )}
                        />
                    )
                }

                {/* Old approach:
                {
                    (data?.users?.length > 0 ) && (
                        <table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
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
                */}
            </div>
        </AppPage>
    );
}

UsersList.propTypes = {

};

export default UsersList;
