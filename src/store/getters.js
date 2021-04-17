export default {
    //获取本地用户数据
    getuserInfo: state => {
        return JSON.parse(JSON.stringify(state.userInfo))
    },
    //获取歌曲id
    getSongsId: state => {
        if (state.songsId === '' && localStorage.getItem('songsId') !== null){
            state.songsId = JSON.parse(localStorage.getItem('songsId'));
        }
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
    },
    //获取歌曲来源
    getSongSource(state){
        return state.songSource;
    }
}