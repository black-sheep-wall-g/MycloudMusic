//获取音乐url
export function getMusicUrl(id) {
    return axios({
        url: "/song/url",
        params:{
            id
        }
    }).catch(err => err);
}
//获取音乐详情
export function getMusicDetail(ids) {
    return axios({
        url: "/song/detail",
        params:{
            ids
        }
    }).catch(err => err);
}
//喜欢音乐
export function getLikeSongs(id,like) {
    return axios({
        url: "/like",
        params:{
            id, //歌曲 id
            like, //布尔值 , 默认为 true 即喜欢 , 若传 false, 则取消喜欢
            timerstamp:`${Date.now()}`
        },
        withCredentials: true //跨域
    }).catch(err => err);
}
//喜欢音乐列表,传入用户 id, 可获取已喜欢音乐id列表(id数组)
export function getLikeList(uid) {
    return axios({
        url: "/likelist",
        params:{
            uid, //歌曲 id
            timerstamp:`${Date.now()}`
        },
        withCredentials: true //跨域
    }).catch(err => err);
}