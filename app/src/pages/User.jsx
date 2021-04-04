import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link, useHistory, useParams } from 'react-router-dom';
import { LikeOutlined, MessageOutlined, StarOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Avatar, Card, List, PageHeader, Space, Tag, Tooltip } from 'antd';
import AppPage from './AppPage';
import './user.less';

const { Meta } = Card;

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

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

function User() {
    const history = useHistory();
    const { id } = useParams(); // get params url
    const { loading, error, data, refetch } = useQuery(USER, {
        variables: { id }
    });

    useEffect(() => {
        refetch();
    }, []);

    if (loading) return <div className="paddings">Loading...</div>;
    if (error) return <div className="paddings">Error :(</div>;

    const user = data?.userById;

    return (
        <AppPage title={(user?.firstname) || 'User'} meta={{ name: '', content: '' }}>
            <PageHeader
                onBack={() => history.push('/users')}
                title="User profil"
                tags={<Tag color="blue">Public</Tag>}
            />

            <div className="container paddings" id="user-container">
                {
                    (user) && (
                        <Card
                            className="card-header-container"
                            actions={[
                                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />
                            ]}
                        >
                            <Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={`${user.firstname} ${user.lastname}`}
                                description={user.email}
                            />
                            {user.content ? user.content : ''}
                        </Card>
                    )
                }

                <h2>Associate posts</h2>
                {
                    (user?.posts?.length > 0) && (
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
                            dataSource={data && user.posts}
                            renderItem={(post) => (
                                <List.Item>
                                    {
                                        (post /* (&& !post.isPrivate || me?._id === user._id) */) && (
                                            <Link to={`/post/${post.id}`}>
                                                <Card
                                                    className="card-userpost-container"
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
                                                        post.isPrivate ? (
                                                            <Tooltip title="This post is private">
                                                                <Tag icon={<LockOutlined />} color="default" />
                                                            </Tooltip>
                                                        ) : (
                                                            <Tooltip title="This post is public">
                                                                <Tag icon={<UnlockOutlined />} color="default" />
                                                            </Tooltip>
                                                        )
                                                    ]}
                                                >
                                                    <Meta
                                                        title={`${post.title}`}
                                                        description={post.description}
                                                    />
                                                    {post.content} {/* TODO do ellipsis */}
                                                </Card>
                                            </Link>
                                        )
                                    }
                                </List.Item>
                            )}
                        />
                    )
                }

                {/* Old approach:
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

                {
                    (user?.posts?.length > 0 ) && (
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
                                            <td>{index + 1} {<Link to={`/post/${post.id}`}>See detail</Link>}</td>
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
                */}
            </div>
        </AppPage>
    );
}

User.propTypes = {

};

export default User;
