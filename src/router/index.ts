import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Ctf from '../views/Ctf/index.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'ctf',
    component: Ctf
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
