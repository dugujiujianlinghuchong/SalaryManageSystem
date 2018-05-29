import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Axios from 'axios'
import Vuex from 'vuex'
import echarts from 'echarts'
import HomePage from './components/homePage.vue'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
// Vue.use(VueResource)
Vue.prototype.$http = Axios
Vue.prototype.$echarts = echarts

//设置路由
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [{
    path: '/HomePage',
    name: 'HomePage',
    component: HomePage
  }, ]
})

// 配置Vuex
const store = new Vuex.Store({
  state: {
    screenWidth: '',
    yhbh: ''
  },
  mutations: {
    getSystemInfo(state, systemInfo) {
      state.screenWidth = systemInfo.screenWidth;
      state.yhbh = systemInfo.yhbh;
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})