import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/Home'
import SearchResult from "@/views/searchResult/SearchResult";
import dayRecomSongs from "../views/songsResource/dayRecomSongs";
import playListResult from "../views/playListView/playListResult";
import videoView from "../views/video/videoView";
import playVideo from "../views/video/playVideo";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/SearchResult/:search',
    name: 'SearchResult',
    component: SearchResult
  },
  {
    path: '/dayRecom',
    name: 'dayRecom',
    component: dayRecomSongs
  },
  {
    path: '/playResult/:id',
    name: 'playResult',
    component: playListResult
  },
  {
    path: '/videoView',
    name: 'videoView',
    component: videoView
  },
  {
    path: '/playVideo/:id',
    name: 'playVideo',
    component: playVideo
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
