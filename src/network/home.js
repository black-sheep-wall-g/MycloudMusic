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


//用户歌单
export function getUserSongList(uid,limit,offset) {
    return axios({
        url: "/user/playlist",
        params:{
            uid,// 用户 id ,必选
            limit,//返回数量 , 默认为 30 ,可选
            offset,//偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 ,可选
            timerstamp:`${Date.now()}`
        },
        withCredentials: true
    }).catch(err => err);
}
