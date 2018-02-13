import fetch from 'node-fetch';

/**
 * Created by admin on 2016/2/20.
 * 此类处理项目中的一些基本操作
 */

function post(url, data = {}) {
    return fetch(url, {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: new Blob([JSON.stringify(data)], {type: 'application/json'}),
    }).then(function (response) {
        return response.json();
    }).then((res) => {
        $log.i(`post请求接口:${url}成功`, res);
        return res;
    }).catch(function (e) {
        $log.e(`post请求接口:${url}失败`, e);
    })
}

function get(url) {
    return fetch(url, {
        method: 'get',
        headers: {"Content-Type": "application/json"},
    }).then(function (response) {
        return response.json();
    }).then(function (res) {
        $log.i(`get请求接口:${url}成功`, res);
        return res;
    }).catch(function (e) {
        $log.e(`get请求接口:${url}失败`, e);
    })
}

export {
    get,
    post
}