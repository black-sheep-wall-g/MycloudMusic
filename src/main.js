import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入viewUI以及css样式
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
//导入全局样式
import "./assets/css/normalize.css";

Vue.use(ViewUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
