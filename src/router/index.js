import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const login = () => import('view/login/login.vue')
const home = () => import('view/home/home.vue')
const category = () => import('view/category/category.vue')
const cart = () => import('view/cart/cart.vue')
const profile = () => import('view/profile/profile.vue')

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/category',
    name: 'category',
    component: category
  },
  {
    path: '/cart',
    name: 'cart',
    component: cart
  },
  {
    path: '/profile',
    name: 'profile',
    component: profile
  }
]

const router = new VueRouter({
  routes,
})

export default router
