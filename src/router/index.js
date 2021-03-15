import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/Home'
import SearchResult from "@/views/searchResult/SearchResult";
import dayRecomSongs from "../views/songsResource/dayRecomSongs";
import playListResult from "../views/playListView/playListResult";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/SearchResult',
    name: 'SearchResult',
    component: SearchResult
  },
  {
    path: '/dayRecom',
    name: 'dayRecom',
    component: dayRecomSongs
  },
  {
    path: '/playResult',
    name: 'playResult',
    component: playListResult
  }
]
//防止重复点击路由造成的冗余导航
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
