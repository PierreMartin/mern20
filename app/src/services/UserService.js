import { localClient } from './index';

export function login(data) {
    return localClient.request({
        method: 'POST',
        url: 'login/',
        withCredentials: true,
        data
    })
        .then((res) => Promise.resolve(res && res.data))
        .catch(err => Promise.reject(err.response && err.response.data));
}

export function signup(data) {
    return localClient.request({
        method: 'POST',
        url: 'signup/',
        withCredentials: true,
        data
    })
        .then((res) => Promise.resolve(res && res.data))
        .catch(err => Promise.reject(err.response && err.response.data));
}

export function logout() {
    return localClient.request({
        method: 'POST',
        url: 'logout/',
        withCredentials: true
    })
        .then((res) => Promise.resolve(res && res.data))
        .catch(err => Promise.reject(err.response && err.response.data));
}

export function checkAuthentication() {
    return localClient.request({
        method: 'POST',
        url: 'checkauthentication/',
        withCredentials: true
    })
        .then((res) => Promise.resolve(res && res.data))
        .catch(err => Promise.resolve(err.response && err.response.data));
}
