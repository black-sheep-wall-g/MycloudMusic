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
//搜索建议
export function suggest(keywords,type) {
    return axios({
        url: "/search/suggest",
        params:{
            keywords,//必选参数
            type  //可选参数,如果传 'mobile' 则返回移动端数据
        }
    }).catch(err => err)
}