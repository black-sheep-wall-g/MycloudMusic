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
