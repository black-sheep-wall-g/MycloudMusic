import Vue from 'vue'
import Vuex from 'vuex'
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    userInfo:{}, //用户信息
    searchDataList:[], //搜索历史
    songsId:'',//歌曲id
    playList:[],//播放列表
    playState:false,//歌曲状态
    loveList:[],//喜欢列表
    songSource:''//歌曲来源
  },
  getters,
  mutations,
  actions
})
