import Vue from 'vue'
import Vuex from 'vuex'
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    userInfo:[], //用户信息
    token:null,//用户token
    searchDataList:[], //搜索历史
    searchResult:{},//搜索结果数据
    songsId:''//歌曲id
  },
  getters,
  mutations,
  actions
})
