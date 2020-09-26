import { localClient } from './index';

export function login(data) {
    return localClient.request({
        method: 'POST',
        url: 'login/',
        data
    })
        .then((res) => Promise.resolve(res && res.data))
        .catch(err => Promise.reject(err.response.data));
}

export function signup(data) {
    return localClient.request({
        method: 'POST',
        url: 'signup/',
        data
    })
        .then((res) => Promise.resolve(res && res.data))
        .catch(err => Promise.reject(err.response.data));
}

export function logout() {
    return localClient.request({
        method: 'POST',
        url: 'logout/'
    })
        .then((res) => Promise.resolve(res && res.data))
        .catch(err => Promise.reject(err.response.data));
}
