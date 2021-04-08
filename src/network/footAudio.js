//获取音乐url
export function getMusicUrl(id) {
    return axios({
        url: "/song/url",
        params:{
            id,
            timerstamp:`${Date.now()}`
        },
        withCredentials: true
    }).catch(err => err);
}
//获取音乐详情
export function getMusicDetail(ids) {
    return axios({
        url: "/song/detail",
        params:{
            ids,
            timerstamp:`${Date.now()}`
        },
        withCredentials: true
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
//获取歌词
export function getLyric(id) {
    return axios({
        url: "/lyric",
        params:{
            id, //音乐 id
            timerstamp:`${Date.now()}`
        },
        withCredentials: true //跨域
    }).catch(err => err);
}
//获取评论
export function getCommentNew(id,type,pageNo,pageSize,sortType,cursor) {
    return axios({
        url: "/comment/new",
        params:{
            id, //资源 id, 如歌曲 id,mv id
            type, //数字 , 资源类型 , 0 对应歌曲 , 1 mv, 2 专辑 , 3 歌单 ,4 电台,5 视频 , 6 动态
            // 可选参数
            pageNo, //分页参数,第N页,默认为1
            pageSize, //分页参数,每页多少条数据,默认20
            sortType, //排序方式,1:按推荐排序,2:按热度排序,3:按时间排序
            cursor, //当sortType为3时且页数不是第一页时需传入,值为上一条数据的time
            timerstamp:`${Date.now()}`
        },
        withCredentials: true //跨域
    }).catch(err => err);
}
//发送/删除评论
export function getComment(t,tpye,id,content,commentId,pageSize,sortType,cursor) {
    return axios({
        url: "/comment",
        params:{
            t, //1 发送, 2 回复 0 删除
            tpye, //数字 , 资源类型 , 0 对应歌曲 , 1 mv, 2 专辑 , 3 歌单 ,4 电台,5 视频 , 6 动态pageNo:分页参数,第N页,默认为1
            id,//资源id
            content,//要发送的内容
            commentId,//回复的评论id (回复评论时必填)
            // 可选参数
            pageSize, //分页参数,每页多少条数据,默认20
            sortType, //排序方式,1:按推荐排序,2:按热度排序,3:按时间排序
            cursor, //当sortType为3时且页数不是第一页时需传入,值为上一条数据的time
            timerstamp:`${Date.now()}`
        },
        withCredentials: true //跨域
    }).catch(err => err);
}

