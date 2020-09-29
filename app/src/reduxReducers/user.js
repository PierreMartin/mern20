import { combineReducers } from 'redux';
import {
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    LOGIN_SUCCESS_USER,
    SIGNUP_SUCCESS_USER,
    UPDATE_USER_SUCCESS,
    LOGIN_ERROR_USER,
    SIGNUP_ERROR_USER,
    CHECK_AUTHENTIFICATION_SUCCESS,
    CHECK_AUTHENTIFICATION_ERROR
} from "../reduxActionsTypes";

/*
const initialState = {
    allIds: [],
    byIds: {}
};
*/

const me = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS_USER:
        case SIGNUP_SUCCESS_USER:
            if (action.payload && action.payload.data) { return action.payload.data; }
            return state;
        case UPDATE_USER_SUCCESS:
            if (action.payload && action.payload.data) { return action.payload.data; }
            return state;
        case CHECK_AUTHENTIFICATION_SUCCESS:
            if (action.payload && action.payload.me) { return action.payload.me; }
            return state;
        default:
            return state;
    }
};

const authenticated = (state = false, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS_USER:
        case SIGNUP_SUCCESS_USER:
        case CHECK_AUTHENTIFICATION_SUCCESS:
            if (action.payload.authenticated) { return action.payload.authenticated; }
            return state;
        case LOGIN_ERROR_USER:
        case SIGNUP_ERROR_USER:
        case CHECK_AUTHENTIFICATION_ERROR:
            if (action.payload) { return action.payload.authenticated; }
            return state;
        default:
            return state;
    }
}

const all = (state = [], action) => {
    switch (action.type) {
        case GET_USERS_SUCCESS:
            if (action.payload) return action.payload;
            return state;
        case GET_USERS_FAILURE:
            return [];
        default:
            return state;
    }
};

const one = (state = {}, action) => {
    switch (action.type) {
        case GET_USER_SUCCESS:
            if (action.payload) return action.payload;
            return state;
        case GET_USER_FAILURE:
            return {};
        default:
            return state;
    }
};

const userReducer = combineReducers({
    me,
    authenticated,
    all,
    one
});

export default userReducer;
