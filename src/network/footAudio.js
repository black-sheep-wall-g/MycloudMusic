//获取音乐url
export function getMusicUrl(id) {
    return axios({
        url: "/song/url",
        params:{
            id
        }
    }).catch(err => err);
}