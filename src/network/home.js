//首页信息
export function getIndexInfo() {
    return axios({
        url:'/homepage/block/page'
    }).catch(err => err);
}
//首页轮播图
export function getIndexBanner() {
    return axios({
        url:'/banner'
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
//通过用户id查询用户数据
export function getUserInfo(uid) {
    return axios({
        url: "/user/detail",
        params:{
            uid
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

//首页推荐歌单
export function getMusicList() {
    return axios({
        url: "/personalized"
    }).catch(err => err);
}
