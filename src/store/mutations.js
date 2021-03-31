export default{
    //储存用户信息数据
    setUserInfo(state, userInfo) {
        state.userInfo = userInfo
    },
    //储存搜索历史数据
    setSearchData(state,searchData){
        state.searchDataList.unshift(searchData)
        state.searchDataList = state.searchDataList.filter((item,index,arr) => {
            return arr.indexOf(item) === index
        })
        localStorage.setItem('searchData',state.searchDataList)
    },
    //存储搜索结果信息
    setSearchResult(state,searchResult){
        state.searchResult = searchResult;
    },
    //保存歌曲id
    setSongsId(state,id){
        state.songsId = id;
        //存储到本地
        localStorage.setItem('songsId',JSON.stringify(id));
    },
    //保存播放列表
    setPlayList(state,playList){
        state.playList = playList;
        //存储到本地
        localStorage.setItem('playList',JSON.stringify(playList));
    },
    //保存播放状态
    setPlayState(state,playState){
        state.playState = playState;
    },
    //保存当前用户喜欢列表
    setLoveList(state,loveList){
        state.loveList = loveList;
    }
}