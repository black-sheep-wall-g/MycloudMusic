//热搜列表(详细)
export function getHotList() {
    return axios({
        url: "/search/hot/detail"
    }).catch(err => err);
}
//用户登录
export function getLogin(phone,password) {
    return axios({
        url: "/login/cellphone",
        params:{
            phone,password
        }
    }).catch(err => err);
}
//获取用户登陆状态
export function getUserStatus() {
    return axios({
        url: "/login/status"
    }).catch(err => err);
}
//用户退出登陆
export function userLogout() {
    return axios({
        url: "/logout"
    }).catch(err => err);
}
//刷新登录
export function refresh() {
    return axios({
        url: "/login/refresh"
    }).catch(err => err)
}