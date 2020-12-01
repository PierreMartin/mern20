import React, { useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Link, useHistory, useLocation } from "react-router-dom";
import { loginAction, signupAction } from "../reduxActions/user";
import AppPage from "./AppPage";
import {
    Form,
    Input,
    Tooltip,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    InputNumber
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import './login.less';

const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function Login({ loginAction, signupAction }) {
    // const [fieldsTyping, setFieldsTyping] = useState({});
    const [form] = Form.useForm();
    const [isSignup, setIsSignup] = useState(false);
    const [errorCredentials, setErrorCredentials] = useState('');
    const history = useHistory();
    const location = useLocation();

    /* Old approach:
    function onInputChange(e) {
        setFieldsTyping({...fieldsTyping, [e.target.name]: e.target.value});
    }
    */

    function onSubmitLogin(values) {
        if (values.email && values.password) {
            loginAction(values).then((res) => {
                if (res && res.payload && res.payload.authenticated) {
                    // if (res) { history.push("/dashboard"); }
                    history.replace((location.state && location.state.from) || '/dashboard');
                } else if (res.payload && res.payload.message) {
                    setErrorCredentials(res.payload.message);
                }
            });
        }
    }

    function onSubmitSignup(values) {
        if (values.email && values.password) {
            signupAction(values).then((res) => {
                if (res && res.payload && res.payload.authenticated) {
                    // if (res) { history.push("/dashboard"); }
                    history.replace((location.state && location.state.from) || '/dashboard');
                } else if (res.payload && res.payload.message) {
                    setErrorCredentials(res.payload.message);
                }
            });
        }
    }

    function onReset() {
        form.resetFields();
    }

    return (
        <AppPage title={isSignup ? 'Signup' : 'Login'} meta={{ name: '', content: '' }}>
            <div className="login-container paddings">
                <h2>{isSignup ? 'Signup' : 'Login'}</h2>

                <Form
                    {...formItemLayout}
                    form={form}
                    name="login"
                    className="login-form"
                    onFinish={isSignup ? onSubmitSignup : onSubmitLogin}
                    initialValues={{ remember: true }}
                    size="small"
                    scrollToFirstError
                >
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                pattern: new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/),
                                message: 'Password must be minimum 6 characters and contain at least one lowercase letter, uppercase letter, and number'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    {
                        isSignup && (
                            <>
                                <Form.Item
                                    name="confirm"
                                    label="Confirm Password"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(rule, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }

                                                return Promise.reject('The two passwords that you entered do not match!');
                                            }
                                        })
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    name="username"
                                    label={
                                        <span>
                                            Username&nbsp;
                                            <Tooltip title="What do you want others to call you?">
                                                <QuestionCircleOutlined />
                                            </Tooltip>
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                            whitespace: true
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item name="age" label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
                                    <InputNumber />
                                </Form.Item>

                                <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                                    <Select
                                        placeholder="Select a option and change input text above"
                                        onChange={null}
                                        allowClear
                                    >
                                        <Option value="male">male</Option>
                                        <Option value="female">female</Option>
                                        <Option value="other">other</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item name="introduction" label="Introduction">
                                    <Input.TextArea />
                                </Form.Item>

                                <Form.Item label="Captcha" extra="We must make sure that your are a human.">
                                    <Row gutter={8}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="captcha"
                                                noStyle
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input the captcha you got!',
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Button>Get captcha</Button>
                                        </Col>
                                    </Row>
                                </Form.Item>

                                <Form.Item
                                    name="agreement"
                                    valuePropName="checked"
                                    rules={[
                                        {
                                            validator: (_, value) =>
                                                value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                                        },
                                    ]}
                                    {...tailFormItemLayout}
                                >
                                    <Checkbox>
                                        I have read the <Link to="">agreement</Link>
                                    </Checkbox>
                                </Form.Item>
                            </>
                        )
                    }

                    <Form.Item {...tailFormItemLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        { errorCredentials && <label className="error-field">{errorCredentials}</label> }
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            {isSignup ? 'Register' : 'Login'}
                        </Button>
                    </Form.Item>
                </Form>

                {/* Old approach
                <form className="form" onSubmit={isSignup ? onSubmitSignup : onSubmitLogin}>
                    <div className="field">
                        <label htmlFor="email">Email <span className="required">*</span></label>
                        <input type="email" name="email" value={fieldsTyping.email || ''} onChange={onInputChange} required />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Password <span className="required">*</span></label>
                        <input type="password" name="password" value={fieldsTyping.password || ''} onChange={onInputChange} required />
                    </div>

                    { errorCredentials && <label className="error-field">{errorCredentials}</label> }

                    <button>{isSignup ? 'Signup' : 'Login'}</button>
                </form>
                */}

                <div className="field inline signup-field">
                    {!isSignup ? <a href="#" onClick={(e) => { e.preventDefault(); onReset(); setIsSignup(true); }}>No yet a account? Create a new account</a> : <a href="#" onClick={(e) => { e.preventDefault(); onReset(); setIsSignup(false); }}>Have a account? Go to login</a>}
                </div>
            </div>
        </AppPage>
    );
}

Login.propTypes = {
    loginAction: PropTypes.func,
    signupAction: PropTypes.func
};

export default connect(null, { loginAction, signupAction })(Login);
