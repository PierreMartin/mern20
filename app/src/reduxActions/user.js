import {
    SIGNUP_SUCCESS_USER,
    SIGNUP_ERROR_USER,
    LOGIN_SUCCESS_USER,
    LOGIN_ERROR_USER,
    CHECK_AUTHENTIFICATION_ERROR,
    CHECK_AUTHENTIFICATION_SUCCESS,
    LOGOUT_SUCCESS_USER,
    LOGOUT_ERROR_USER
} from '../reduxActionsTypes/index';
import { checkAuthentication, login, logout, signup } from '../services/UserService';

/*
export function xxxAction(data) {
    return {
        type: XXX_XXX,
        payload: { data }
    };
}
*/

export function signupAction(data) {
    return (dispatch) => {
        return signup(data)
            .then((res) => {
                if (res?.data) {
                    console.log('authenticated ==> ', res.data.authenticated);
                    return dispatch({
                        type: SIGNUP_SUCCESS_USER,
                        payload: {
                            message: res.message,
                            authenticated: res.data.authenticated ? 'true' : 'false',
                            me: res.data.me
                        }
                    });
                }
            })
            .catch((err) => {
                console.log('authenticated ==> ', err);
                return dispatch((
                    {
                        type: SIGNUP_ERROR_USER,
                        payload: {
                            message: err?.message,
                            fieldsErrors: err?.fieldsErrors,
                            authenticated: 'false'
                        }
                    }
                ));
            });
    };
}

export function loginAction(data) {
    return (dispatch) => {
        return login(data)
            .then((res) => {
                if (res?.data) {
                    console.log('authenticated ==> ', res.data.authenticated);
                    return dispatch({
                        type: LOGIN_SUCCESS_USER,
                        payload: {
                            message: res.message,
                            authenticated: res.data.authenticated ? 'true' : 'false',
                            me: res.data.me
                        }
                    });
                }
            })
            .catch((err) => {
                console.log('authenticated ==> ', err);
                return dispatch({
                    type: LOGIN_ERROR_USER,
                    payload: {
                        message: err?.message,
                        fieldsErrors: err?.fieldsErrors,
                        authenticated: 'false'
                    }
                });
            });
    };
}

export function checkAuthenticationAction() {
    return (dispatch) => {
        return checkAuthentication()
            .then((res) => {
                if (res?.data) {
                    console.log('authenticated ==> ', res.data.authenticated);
                    dispatch({
                        type: CHECK_AUTHENTIFICATION_SUCCESS,
                        payload: {
                            message: res.message,
                            authenticated: res.data.authenticated ? 'true' : 'false',
                            me: res.data.me
                        }
                    });
                }
            })
            .catch((err) => {
                console.log('authenticated ==> ', err);
                dispatch({
                    type: CHECK_AUTHENTIFICATION_ERROR,
                    payload: {
                        message: err?.message,
                        authenticated: 'false'
                    }
                });
            });
    };
}

export function logoutAction() {
    return (dispatch) => {
        return logout()
            .then((res) => {
                if (res?.data) {
                    console.log('authenticated ==> ', res.data.authenticated);
                    return dispatch({
                        type: LOGOUT_SUCCESS_USER,
                        payload: {
                            message: res.message,
                            authenticated: res.data.authenticated ? 'true' : 'false',
                            me: res.data.me
                        }
                    });
                }
            })
            .catch((err) => {
                console.log('authenticated ==> ', err);
                return dispatch({
                    type: LOGOUT_ERROR_USER,
                    payload: {
                        message: err?.message,
                        authenticated: 'true'
                    }
                });
            });
    };
}
