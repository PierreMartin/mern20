import React, { useEffect, useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Tag, Checkbox, Tooltip, Spin, notification, Button } from 'antd';
import { gql, useQuery, useMutation } from "@apollo/client";
import AppPage from "./AppPage";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import './dashboard.less';

const POSTS = gql`
    query GetPosts($userId: String!)  {
        postsByUserId (userId: $userId) {
            id
            title
            description
            content
            isPrivate
        }
    }
`;

const EDIT_POST = gql`
    mutation EditPostById($filter: FilterInput_editPost, $data: DataInput_editPost) {
        editPostById(filter: $filter, data: $data) {
            title
            description
            content
        }
    }
`;

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`
                        }
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

function Dashboard({ me }) {
    const userId = me && me._id;
    const { loading, error, data, refetch } = useQuery(POSTS, { variables: { userId } });
    // OR =>   const [getPosts, { loading, data }] = useLazyQuery(POSTS);  <button onClick={ (getPosts()) } />
    const [editPostById, { data: editPostData, loading: editPostLoading, error: editPostError }] = useMutation(EDIT_POST);
    const [postsData, setPostsData] = useState([]);
    const [form] = Form.useForm();
    // const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [editingId, setEditingId] = useState('');
    const isEditing = (record) => record.id === editingId;

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        if (data && data.postsByUserId) {
            const posts = data.postsByUserId.map((post) => ({ key: post.id, ...post, tags: ['developer', 'cool'] })); // 'tags' just for tests
            setPostsData(posts);
        }
    }, [data]);

    const edit = (record) => {
        form.setFieldsValue({
            title: '',
            description: '',
            content: '',
            ...record
        });

        setEditingId(record.id);
    };

    const cancel = () => {
        setEditingId('');
    };

    const save = async (id) => {
        try {
            const fieldsTyping = await form.validateFields();
            const newData = [...postsData];
            const index = newData.findIndex((item) => id === item.id);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...fieldsTyping });
                setPostsData(newData);
                setEditingId('');

                editPostById({
                    variables: {
                        filter: { _id: id },
                        data: fieldsTyping
                    }
                }).then((res) => {
                    if (res && res.data && res.data.editPostById) {
                        notification['success']({
                            message: 'Success',
                            description: 'You have updated the post.'
                        });
                    }
                });
            } else {
                newData.push(fieldsTyping);
                setPostsData(newData);
                setEditingId('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            render: title => <a>{title}</a>,
            width: '20%',
            sorter: (a, b) => a.title.length - b.title.length,
            editable: true
        },
        {
            title: 'Description',
            dataIndex: 'description',
            width: '20%',
            sorter: (a, b) => a.description.length - b.description.length,
            editable: true
        },
        {
            title: 'Content',
            dataIndex: 'content',
            width: '20%',
            sorter: (a, b) => a.content.length - b.content.length,
            ellipsis: { showTitle: false },
            render: content => (
                <Tooltip placement="topLeft" title={content}>
                    {content}
                </Tooltip>
            ),
            editable: true
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <span>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'developer') { color = 'volcano'; }

                        return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
                    })}
                </span>
            ),
            width: '16%'
        },
        {
            title: 'Is private',
            dataIndex: 'isPrivate',
            render: isPrivate => <Checkbox checked={isPrivate} disabled />,
            width: '10%',
            onFilter: (value, record) => record.isPrivate === value,
            filters: [
                { text: 'True', value: true },
                { text: 'False', value: false }
            ],
            editable: false
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);

                return editable ? (
                    <span>
                        <Button
                            type="link"
                            loading={editPostLoading}
                            onClick={() => save(record.id)}
                            style={{ padding: 5, display: 'inline-block' }}
                        >
                            Save
                        </Button>

                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <Button type="link" style={{ padding: 5, display: 'inline-block' }}>Cancel</Button>
                        </Popconfirm>
                    </span>
                ) : (
                    <a disabled={editingId !== ''} onClick={() => edit(record)}>
                        Edit
                    </a>
                );
            }
        }
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) { return col; }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'isPrivate' ? 'boolean' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record)
            })
        };
    });

    if (loading) {
        return (
            <div className="paddings">
                <div className="flex items-center justify-center">
                    <Spin size="large" />
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="paddings">Error :(</div>;
    }

    const onChange = (pagination, filters, sorter, extra) => console.log('params', pagination, filters, sorter, extra);

    return (
        <AppPage title="Dashboard" meta={{ name: '', content: '' }}>
            <div id="dashboard-container" className="paddings">
                <h2>Dashboard</h2>

                <Form form={form} component={false}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell
                            }
                        }}
                        bordered
                        dataSource={postsData}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={{ onChange: cancel }}
                        onChange={onChange}
                    />
                </Form>

                {/*
                Old approach:
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
                */}
            </div>
        </AppPage>
    );
}

Dashboard.propTypes = {
    me: PropTypes.any,
};

function mapStateToProps(state) {
    return {
        me: state.user.me
    };
}

export default connect(mapStateToProps, null)(Dashboard);
