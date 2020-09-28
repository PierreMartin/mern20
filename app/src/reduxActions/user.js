import {
    SIGNUP_SUCCESS_USER,
    SIGNUP_ERROR_USER
} from "../reduxActionsTypes/index";
import { signup } from "../services/UserService";

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
