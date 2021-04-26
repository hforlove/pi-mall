import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const login = () => import('view/login/login.vue')
const home = () => import('view/home/home.vue')
const category = () => import('view/category/category.vue')
const cart = () => import('view/cart/cart.vue')
const profile = () => import('view/profile/profile.vue')
const goods = () => import('view/goodsList/goodsList.vue')
const detail = () => import('view/goodsDetail/goodsDetail.vue')
const orderCreate = () => import('view/order/orderCreate.vue')
const orderList = () => import('view/order/orderList.vue')
const orderDetail = () => import('view/order/orderDetail.vue')
const addressList = () => import('view/address/addressList.vue')
const addressEdit = () => import('view/address/addressEdit.vue')
const pay = () => import('view/pay/pay.vue')
const userInfo = () => import('view/userInfo/userInfo.vue')
const collect = () => import('view/collect/collect.vue')

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
    path: '/goods',
    name: 'goods',
    component: goods
  },
  {
    path: '/detail',
    name: 'detail',
    component: detail
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
  },
  {
    path: '/order',
    name: 'order',
    component: orderList
  },
  {
    path: '/orderCreate',
    name: 'orderCreate',
    component: orderCreate
  },
  {
    path: '/orderDetail',
    name: 'orderDetail',
    component: orderDetail
  },
  {
    path: '/address',
    name: 'address',
    component: addressList
  },
  {
    path: '/addressEdit',
    name: 'addressEdit',
    component: addressEdit
  },
  {
    path: '/pay',
    name: 'pay',
    component: pay
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: userInfo
  },
  {
    path: '/collect',
    name: 'collect',
    component: collect
  }
]

const router = new VueRouter({
  routes,
})

export default router
