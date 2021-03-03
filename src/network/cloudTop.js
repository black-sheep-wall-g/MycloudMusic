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
        url: "/login/status",
        params:{
            timerstamp:`${Date.now()}`
        },
        withCredentials: true //跨域
    }).catch(err => err);
}
//用户退出登陆
export function userLogout() {
    return axios({
        url: "/logout",
        withCredentials: true
    }).catch(err => err);
}
//刷新登录
export function refresh() {
    return axios({
        url: "/login/refresh",
        params:{
            timerstamp:`${Date.now()}`
        },
        withCredentials: true
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
//搜索接口
export function getSearch(keywords,limit,offset,type) {
    return axios({
        url: "/cloudsearch",
        params:{
            keywords,//必选参数，关键词
            limit,  //可选参数,返回数量 , 默认为 30
            offset, //偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
            type //搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
        }
    }).catch(err => err)
}
//二维码key生成接口
export function getQrKeyLogin() {
    return axios({
        url: "/login/qr/key",
        params:{
            timerstamp:`${Date.now()}`
        },
        withCredentials: true //跨域
    }).catch(err => err)
}
//二维码生成接口
export function getQrLogin(key,qrimg) {
    return axios({
        url: "/login/qr/create",
        params:{
            key,//必选参数，为二维码key
            qrimg,//可选参数，返回二维码图片base64编码
            timerstamp:`${Date.now()}`
        },
        withCredentials: true //跨域
    }).catch(err => err)
}
// 二维码检测扫码状态接口
export function getQrState(key) {
    return axios({
        url: "/login/qr/check",
        params:{
            key,//必选，二维码key
            timerstamp:`${Date.now()}`
        },
        withCredentials: true //跨域
    }).catch(err => err)
}