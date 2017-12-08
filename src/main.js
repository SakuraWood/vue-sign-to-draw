// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as util from './assets/utils'

/* 引入公共样式 */
import './assets/reset.css'
import './assets/public.scss'

Vue.config.productionTip = false

Vue.prototype.$util = util

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
