import { localClient } from './index';

export function getAllPosts() {
    return localClient.request({
        method: 'GET',
        url: 'test/'
    }).then((res) => res && res.data).catch(err => err)
}

/*
export function getPostsByField() {
    return localClient.request({
        method: 'POST',
        url: 'getposts/',
        data
    }).then((res) => res && res.data).catch(err => err)
}

export function getPostByField() {
    return localClient.request({
        method: 'POST',
        url: 'getpost/',
        data
    }).then((res) => res && res.data).catch(err => err)
}
*/
