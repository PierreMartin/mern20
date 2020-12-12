import React, { useEffect, useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Tag, Checkbox } from 'antd';
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

function Dashboard() {
    const { loading, error, data } = useQuery(POSTS);
    // OR =>   const [getPosts, { loading, data }] = useLazyQuery(POSTS);  <button onClick={ (getPosts()) } />
    // const [editPost, { /*data, */loading: mutationLoading, error: mutationError }] = useMutation(EDIT_POST); // TODO
    const [postsData, setPostsData] = useState([]);
    const [form] = Form.useForm();
    // const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [editingId, setEditingId] = useState('');
    const isEditing = (record) => record.id === editingId;

    useEffect(() => {
        if (data && data.posts) {
            const posts = data.posts.map((post) => ({ key: post.id, ...post, tags: ['developer', 'cool'] })); // 'tags' just for tests
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

                // TODO editPost({ postId: id, data: fieldsTyping });
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
            width: '20%'
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
                        <a
                            href="javascript:;"
                            onClick={() => save(record.id)}
                            style={{ marginRight: 8 }}
                        >
                          Save
                        </a>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
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

    if (loading) return <div className="paddings">Loading...</div>;
    if (error) return <div className="paddings">Error :(</div>;

    const onChange = (pagination, filters, sorter, extra) => console.log('params', pagination, filters, sorter, extra);

    return (
        <AppPage title="Dashboard" meta={{ name: '', content: '' }}>
            <div className="dashboard-container paddings">
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

                {/*{
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
                }*/}
            </div>
        </AppPage>
    );
}

Dashboard.propTypes = {

};

export default Dashboard;
