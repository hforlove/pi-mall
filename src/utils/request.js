import axios from 'axios'

import { Notify } from 'vant'
import { getToken } from 'utils'

import router from '../router'

const request = axios.create({
  // baseURL:'http://106.52.36.53:8100/admin',
  baseURL:'http://admin-api.macrozheng.com',
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
    return res.data.data
  }else{
    Notify(res.data.message)
  }
})

export default request