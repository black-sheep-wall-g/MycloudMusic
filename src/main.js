import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//全局引入网络请求
import "./network/request";
//导入viewUI以及css样式
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
//导入全局样式
import "./assets/css/normalize.css";
//全局引入vue_swiper插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper);
Vue.use(ViewUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
