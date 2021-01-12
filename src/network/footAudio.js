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