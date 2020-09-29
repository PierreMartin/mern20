import {
    SIGNUP_SUCCESS_USER,
    SIGNUP_ERROR_USER,
    LOGIN_SUCCESS_USER,
    LOGIN_ERROR_USER,
    CHECK_AUTHENTIFICATION_ERROR,
    CHECK_AUTHENTIFICATION_SUCCESS
} from "../reduxActionsTypes/index";
import { checkAuthentication, login, signup } from "../services/UserService";

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
                if (res && res.data) {
                    console.log('authenticated ==> ', 'true');
                    dispatch({
                        type: SIGNUP_SUCCESS_USER,
                        payload: {
                            message: res.message,
                            data: res.data,
                            authenticated: res.authenticated
                        }
                    });
                }
            })
            .catch((err) => {
                console.error('authenticated ==> ', err);
                dispatch((
                    {
                        type: SIGNUP_ERROR_USER,
                        payload: {
                            messageError: err.message,
                            email: data.email,
                            authenticated: false
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
                if (res && res.data) {
                    console.log('authenticated ==> ', 'true');
                    dispatch({
                        type: LOGIN_SUCCESS_USER,
                        payload: {
                            message: res.message,
                            data: res.data,
                            authenticated: res.authenticated
                        }
                    });
                }
            })
            .catch((err) => {
                console.error('authenticated ==> ', err);
                dispatch({
                    type: LOGIN_ERROR_USER,
                    payload: {
                        messageError: err.message,
                        authenticated: false
                    }
                });
            });
    };
}

export function checkAuthenticationAction() {
    return (dispatch) => {
        checkAuthentication()
            .then((res) => {
                if (res && res.data) {
                    console.log('authenticated ==> ', res.data.authenticated);
                    dispatch({
                        type: CHECK_AUTHENTIFICATION_SUCCESS,
                        payload: {
                            authenticated: res.data.authenticated,
                            me: res.data.me
                        }
                    });
                }
            })
            .catch((err) => {
                console.error('authenticated ==> ', err);
                dispatch({
                    type: CHECK_AUTHENTIFICATION_ERROR,
                    payload: {
                        messageError: err.message,
                        authenticated: false
                    }
                });
            });
    };
}
