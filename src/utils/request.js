import axios from 'axios'

import { Notify } from 'vant'
import { getToken } from 'utils'

import router from '../router'

  // baseURL:'http://106.52.36.53:8100/admin', 腾讯云的后台
  // baseURL:'http://admin-api.macrozheng.com', 原创人后台

const domain = 'http://www.pride.demo.com/'

const request = axios.create({
  baseURL: `${domain}api/tiny-shop/v1`,
  timeout: 1000
})

request.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${getToken()}`
  return config
}, err => {
  return Promise.reject(err)
})

request.interceptors.response.use(res => {
  if(res.data.code == 401){
    Notify(res.data.message)
    router.push('/login')
  }
  if(res.data.code == 200){
    return res.data
  }else{
    Notify(res.data.message)
  }
})

export default request