import { localClient } from './index';

export function login() {
    return localClient.request({
        method: 'POST',
        url: 'login/'
    }).then((res) => res && res.data).catch(err => err)
}

export function signup(data) {
    return localClient.request({
        method: 'POST',
        url: 'signup/',
        data
    }).then((res) => res && res.data).catch(err => err)
}

export function logout() {
    return localClient.request({
        method: 'POST',
        url: 'logout/'
    }).then((res) => res && res.data).catch(err => err)
}
