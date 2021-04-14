//获取视频分类列表
export function getVideoCategoryList() {
  return axios({
    url:'/video/category/list',
    params:{
      timerstamp:`${Date.now()}`
    },
    withCredentials: true
  }).catch(err => err);
}
//获取视频标签列表
export function getVideoGroupList() {
  return axios({
    url:'/video/group/list',
    params:{
      timerstamp:`${Date.now()}`
    },
    withCredentials: true
  }).catch(err => err);
}
//获取视频标签/分类下的视频
export function getVideoGroup(id,offset) {
  return axios({
    url:'/video/group',
    params:{
      id,//videoGroup 的 id
      //可选参数
      offset,
      timerstamp:`${Date.now()}`
    },
    withCredentials: true
  }).catch(err => err);
}
//获取全部视频列表
export function getVideoAll(offset) {
  return axios({
    url:'/video/timeline/all',
    params:{
      //可选参数
      offset,
      timerstamp:`${Date.now()}`
    },
    withCredentials: true
  }).catch(err => err);
}
//获取视频播放地址
export function getVideoUrl() {
  return axios({
    url:'/video/url',
    params:{
      timerstamp:`${Date.now()}`
    },
    withCredentials: true
  }).catch(err => err);
}