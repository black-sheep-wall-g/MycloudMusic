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

//首页每日推荐歌单
export function getRecomMusicList() {
    return axios({
        url: "/recommend/resource",
        params:{
            timerstamp:`${Date.now()}`
        },
        withCredentials: true
    }).catch(err => err);
}

//首页每日推荐歌单
export function getRecomSongs() {
    return axios({
        url: "/recommend/songs",
        params:{
            timerstamp:`${Date.now()}`
        },
        withCredentials: true
    }).catch(err => err);
}
