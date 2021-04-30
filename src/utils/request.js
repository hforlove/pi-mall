import axios from 'axios'

import { Notify } from 'vant'
import { getToken } from './index'
import { host } from './config'

import router from '../router'

import store from '../store'

const request = axios.create({
  baseURL: `${host}api/tiny-shop/v1`,
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