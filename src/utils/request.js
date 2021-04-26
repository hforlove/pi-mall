import axios from 'axios'

import { Notify } from 'vant'
import { getToken } from 'utils'

import router from '../router'

import store from '../store'

  // baseURL:'http://106.52.36.53:8100/admin', 腾讯云的后台
  // baseURL:'http://admin-api.macrozheng.com', 原创人后台

const domain = 'http://www.pride.demo.com/'

const request = axios.create({
  baseURL: `${domain}api/tiny-shop/v1`,
  timeout: 10000
})

request.interceptors.request.use(config => {
  store.commit('setLoading', true)
  config.headers['x-api-key'] = getToken()
  return config
}, err => {
  return Promise.reject(err)
})

request.interceptors.response.use(res => {
  store.commit('setLoading', false)
  if(res.data.code == 401){
    Notify(res.data.message)
    router.push('/login')
  }
  if(res.data.code == 200){
    return res.data
  }else{
    Notify(res.data.message)
    return Promise.reject(res.data.message)
  }
},err => {
  store.commit('setLoading', false)
  return Promise.reject(err)
})

export default request