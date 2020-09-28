import { combineReducers } from 'redux';
import {
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    LOGIN_SUCCESS_USER,
    SIGNUP_SUCCESS_USER,
    UPDATE_USER_SUCCESS
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
            if (action.payload.data) { return action.payload.data; }
            return state;
        case UPDATE_USER_SUCCESS:
            if (action.payload) { return action.payload.data; }
            return state;
        default:
            return state;
    }
};

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
    all,
    one
});

export default userReducer;
