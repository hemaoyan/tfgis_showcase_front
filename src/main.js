/*
 * @Author: your name
 * @Date: 2021-06-15 20:23:19
 * @LastEditTime: 2021-11-02 14:36:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tfgis_showcase_front/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/common/vehicle/assets/iconfont/iconfont.css'

import '@/styles/index.scss' // global css
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.prototype.$loginVideo = require('@/common/vehicle/assets/img/login-video.mp4');


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.use(ElementUI)
