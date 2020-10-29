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

//通过用户id查询用户数据
export function getUserInfo(uid) {
    return axios({
        url: "/user/detail",
        params:{
            uid
        }
    }).catch(err => err);
}

//首页推荐歌单
export function getMusicList() {
    return axios({
        url: "/personalized"
    }).catch(err => err);
}
