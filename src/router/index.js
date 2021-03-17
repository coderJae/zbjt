import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name: 'main',
    redirect: { name: 'Map' },
  },
  {
    path: '/map',
    name: 'Map',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Map.vue')
  },{
    path:'/realtimeMonitor',
    name:'RealtimeMonitor',
    component:() => import('../views/RealtimeMonitor.vue')
  },{
    path:'/demo',
    name:'demo',
    component:() => import('../views/demo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
