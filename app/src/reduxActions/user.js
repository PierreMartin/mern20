import {
    SIGNUP_SUCCESS_USER,
    SIGNUP_ERROR_USER,
    LOGIN_SUCCESS_USER,
    LOGIN_ERROR_USER
} from "../reduxActionsTypes/index";
import { login, signup } from "../services/UserService";

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
        signup(data)
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: SIGNUP_SUCCESS_USER,
                        payload: {
                            message: res.message,
                            data: res.data
                        }
                    });
                }
            })
            .catch((err) => {
                dispatch((
                    {
                        type: SIGNUP_ERROR_USER,
                        payload: {
                            messageError: err.message,
                            email: data.email
                        }
                    }
                ));
            });
    };
}

// AuthPassport
export function loginAction(data) {
    return (dispatch) => {
        login(data)
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: LOGIN_SUCCESS_USER,
                        payload: {
                            message: res.message,
                            data: res.data
                        }
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: LOGIN_ERROR_USER,
                    payload: {
                        messageError: err.message
                    }
                });
            });
    };
}
