import React, { useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { useHistory, useLocation } from "react-router-dom";
import { loginAction, signupAction } from "../reduxActions/user";
import '../css/main.css';
import './login.css';

function Login(props) {
    const [fieldsTyping, setFieldsTyping] = useState({});
    const [isSignup, setIsSignup] = useState(false);
    const history = useHistory();
    const location = useLocation();

    function onInputChange(e) {
        setFieldsTyping({...fieldsTyping, [e.target.name]: e.target.value});
    }

    function onSubmitLogin(e) {
        e.preventDefault();

        if (fieldsTyping.email && fieldsTyping.password) {
            props.loginAction(fieldsTyping).then((res) => {
                // if (res) { history.push("/posts"); }
                if (res) { history.replace((location.state && location.state.from) || '/posts'); }
            });
        }
    }

    function onSubmitSignup(e) {
        e.preventDefault();

        if (fieldsTyping.email && fieldsTyping.password) {
            props.signupAction(fieldsTyping).then((res) => {
                // if (res) { history.push("/posts"); }
                if (res) { history.replace((location.state && location.state.from) || '/posts'); }
            });
        }
    }

    return (
        <div className="login-container paddings">
            <h2>{isSignup ? 'Signup' : 'Login'}</h2>

            <form className="form" onSubmit={isSignup ? onSubmitSignup : onSubmitLogin}>
                { isSignup &&  (
                    <>
                        <div className="field">
                            <label htmlFor="firstname">Firstname</label>
                            <input type="text" name="firstname" value={fieldsTyping.firstname || ''} onChange={onInputChange} />
                        </div>
                        <div className="field">
                            <label htmlFor="lastname">Lastname</label>
                            <input type="text" name="lastname" value={fieldsTyping.lastname || ''} onChange={onInputChange} />
                        </div>
                    </>
                )}

                <div className="field">
                    <label htmlFor="email">Email <span className="required">*</span></label>
                    <input type="email" name="email" value={fieldsTyping.email || ''} onChange={onInputChange} required />
                </div>
                <div className="field">
                    <label htmlFor="password">Password <span className="required">*</span></label>
                    <input type="password" name="password" value={fieldsTyping.password || ''} onChange={onInputChange} required />
                </div>

                <button>{isSignup ? 'Signup' : 'Login'}</button>
            </form>

            <div className="field inline signup-field">
                {!isSignup ? <a href="#" onClick={(e) => { e.preventDefault(); setIsSignup(true); }}>No yet a account? Create a new account</a> : <a href="#" onClick={(e) => { e.preventDefault(); setIsSignup(false); }}>Have a account? Go to login</a>}
            </div>
        </div>
    );
}

Login.propTypes = {
    loginAction: PropTypes.func,
    signupAction: PropTypes.func
};

export default connect(null, { loginAction, signupAction })(Login);
