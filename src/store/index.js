import Vue from 'vue'
import Vuex from 'vuex'
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    userInfo:null, //用户信息
    token:null
  },
  getters,
  mutations,
  actions
})
