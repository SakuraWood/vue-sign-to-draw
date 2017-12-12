import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import draw from '@/components/draw'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/draw',
      name: 'draw',
      component: draw
    }
  ]
})
