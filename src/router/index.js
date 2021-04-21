import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/Home')

  },
  {
    path: '/SearchResult/:search',
    name: 'SearchResult',
    component: () => import('@/views/searchResult/SearchResult')

  },
  {
    path: '/dayRecom',
    name: 'dayRecom',
    component: () => import('@/views/songsResource/dayRecomSongs')
  },
  {
    path: '/playResult/:id',
    name: 'playResult',
    component: () => import('@/views/playListView/playListResult')
  },
  {
    path: '/videoView',
    name: 'videoView',
    component: () => import('@/views/video/videoView')
  },
  {
    path: '/playVideo/:id',
    name: 'playVideo',
    component: () => import('@/views/video/playVideo')
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
