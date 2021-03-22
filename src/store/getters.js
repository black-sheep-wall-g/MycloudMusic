export default {
    //获取本地用户数据
    userInfo: (state) => {
        if (state.userInfo.length === 0) {
            let sessionUser = sessionStorage.getItem('user')
            let localeUser = localStorage.getItem('user')
            if (sessionUser !== null) {
                state.userInfo = JSON.parse(sessionUser)
            } else if (localeUser !== null) {
                state.userInfo = JSON.parse(localeUser)
            }
        }
        return state.userInfo
    },
    //获取本地token
    token: (state) => {
        if (state.token === null) {
            let sessionToken = sessionStorage.getItem('token')
            let localeToken = localStorage.getItem('token')
            if (sessionToken !== null) {
                state.token = sessionToken
            } else if (localeToken !== null) {
                state.token = localeToken
            }
        }
        return state.token
    },
    //获取搜索结果信息
    getSearchResult: state => {
        return state.searchResult;
    },
    //获取歌曲id
    getSongsId: state => {
        return state.songsId;
    },
    //获取播放列表
    getPlayList: state => {
        if (state.playList.length === 0 && localStorage.getItem('playList') !== null) {
            state.playList = JSON.parse(localStorage.getItem('playList'));
        }
        return state.playList;
    },
    //获取歌曲state
    getPlayState: state => {
        return state.playState;
    },
    //获取喜欢列表
    getLoveList: state => {
        return state.loveList;
    }
}