import { localClient } from './index';

export function getAllPosts() {
    return localClient.request({
        method: 'GET',
        url: 'getposts/'
    })
        .then((res) => Promise.resolve(res?.data))
        .catch((err) => Promise.reject(err?.response?.data));
}

export function addPost(data) {
    return localClient.request({
        method: 'POST',
        url: 'addpost/',
        data
    })
        .then((res) => Promise.resolve(res?.data))
        .catch((err) => Promise.reject(err?.response?.data));
}

/*
export function getPostsByField() {
    return localClient.request({
        method: 'POST',
        url: 'getposts/',
        data
    })
        .then((res) => Promise.resolve(res && res.data))
        .catch(err => Promise.reject(err.response && err.response.data));
}

export function getPostByField() {
    return localClient.request({
        method: 'POST',
        url: 'getpost/',
        data
    })
        .then((res) => Promise.resolve(res && res.data))
        .catch(err => Promise.reject(err.response && err.response.data));
}
*/
