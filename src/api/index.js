import request from 'utils/request'

/** 
 * 用户模块api
*/

// 获取验证码
export function sendSmsCode(mobile){
  return request({
    method:'post',
    url: '/site/sms-code',
    data:{
      usage: "register",
      mobile
    }
  })
}

// 注册
export function register(data){
  return request({
    method:'post',
    url: '/site/register',
    data
  })
}

// 登陆
export function login (data) {
  return request({
    method: 'post',
    url: '/site/login',
    data
  })
}


/** 
 * 首页api
*/
export function getHomeData () {
  return request({
    method: 'get',
    url: '/index/index'
  })
}


/** 
 * 分类api
*/
export function getCategory () {
  return request({
    method: 'get',
    url: '/product/cate/index'
  })
}


/** 
 * 商品列表
*/
export function getGoodsList (params) {
  return request({
    method: 'get',
    url: '/product/product/index',
    params
  })
}