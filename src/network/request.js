import axios from "axios";

const url = 'https://www.yeteacher.top:3000';

let config = {
    baseURL:url,
    timeout:10000
}

const _axios = axios.create(config);

// 请求拦截
_axios.interceptors.request.use(
    req => {
        return req;
    },
    err => {
        return Promise.reject(err);
    }
);

// 响应拦截
_axios.interceptors.response.use(
    res => {
        return res.data;
    },
    err => {
        return Promise.reject(err);
    }
);

// 全局注册axios
window.axios = _axios;