import React, { useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Link, useHistory, useLocation } from "react-router-dom";
import { loginAction, signupAction } from "../reduxActions/user";
import AppPage from "./AppPage";
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    InputNumber
} from 'antd';
import {
    MailOutlined,
    UserOutlined,
    LockOutlined
} from '@ant-design/icons';
import './login.less';

const { Option } = Select;
/*
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
*/

function Login({ loginAction, signupAction }) {
    // const [fieldsTyping, setFieldsTyping] = useState({});
    // const [errorCredentials, setErrorCredentials] = useState('');
    const [form] = Form.useForm();
    const [isSignup, setIsSignup] = useState(false);
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
                } else if (res.payload && res.payload.fieldsErrors && res.payload.fieldsErrors.length) {
                    form.setFields(res.payload.fieldsErrors);
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
                } else if (res.payload && res.payload.fieldsErrors && res.payload.fieldsErrors.length) {
                    form.setFields(res.payload.fieldsErrors);
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
                <Form
                    form={form}
                    name="login"
                    className="login-form"
                    onFinish={isSignup ? onSubmitSignup : onSubmitLogin}
                    initialValues={{ remember: true }}
                    layout="vertical"
                    scrollToFirstError
                >
                    <h2>{isSignup ? 'Signup' : 'Login'}</h2>

                    <Form.Item
                        name="email"
                        // label="E-mail"
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
                        <Input prefix={<MailOutlined className="login-icon" />} placeholder="E-mail" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        // label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            isSignup && {
                                pattern: new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/),
                                message: 'Password must be minimum 6 characters and contain at least one lowercase letter, uppercase letter number and no special characters'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input.Password prefix={<LockOutlined className="login-icon" />} placeholder="Password" />
                    </Form.Item>

                    {
                        isSignup && (
                            <>
                                <Form.Item
                                    name="confirm"
                                    // label="Confirm Password"
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
                                    <Input.Password prefix={<LockOutlined className="login-icon" />} placeholder="Confirm Password" />
                                </Form.Item>

                                <Form.Item
                                    name="username"
                                    /*
                                    label={
                                        <span>
                                            Username&nbsp;
                                            <Tooltip title="What do you want others to call you?">
                                                <QuestionCircleOutlined />
                                            </Tooltip>
                                        </span>
                                    }
                                    */
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                            whitespace: true
                                        }
                                    ]}
                                >
                                    <Input prefix={<UserOutlined className="login-icon" />} placeholder="Username" />
                                </Form.Item>

                                <Form.Item name="firstname">
                                    <Input prefix={<UserOutlined className="login-icon" />} placeholder="Firstname" />
                                </Form.Item>

                                <Form.Item name="lastname">
                                    <Input prefix={<UserOutlined className="login-icon" />} placeholder="Lastname" />
                                </Form.Item>

                                <Form.Item name="age" rules={[{ type: 'number', min: 0, max: 99 }]}>
                                    <InputNumber placeholder="Age" />
                                </Form.Item>

                                <Form.Item name="gender" rules={[{ required: true }]}>
                                    <Select placeholder="Gender" allowClear>
                                        <Option value="male">male</Option>
                                        <Option value="female">female</Option>
                                        <Option value="other">other</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item name="introduction">
                                    <Input.TextArea placeholder="Introduction" />
                                </Form.Item>

                                <Form.Item extra="We must make sure that your are a human.">
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
                                                <Input placeholder="Captcha" />
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
                                >
                                    <Checkbox>
                                        I have read the <Link to="">agreement</Link>
                                    </Checkbox>
                                </Form.Item>
                            </>
                        )
                    }

                    <Form.Item className="field-checkbox">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a href="">Forgot password</a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="button-submit">
                            {isSignup ? 'Register' : 'Login'}
                        </Button>
                        Or {!isSignup ? <a href="#" onClick={(e) => { e.preventDefault(); onReset(); setIsSignup(true); }}>register now!</a> : <a href="#" onClick={(e) => { e.preventDefault(); onReset(); setIsSignup(false); }}>Login</a>}
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
            </div>
        </AppPage>
    );
}

Login.propTypes = {
    loginAction: PropTypes.func,
    signupAction: PropTypes.func
};

export default connect(null, { loginAction, signupAction })(Login);
