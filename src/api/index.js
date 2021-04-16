import request from 'utils/request'

// 登陆
export function login (data) {
  return request({
    method: 'post',
    url: '/admin/login',
    data
  })
}

// 注册
export function register(data){
  return request({
    mothod:'post',
    url: '/admin/register',
    data
  })
}


/*
**  首页相关api
*/

// 轮播图
export function getHomeSwiper(){
  return request({
    method:'get',
    url:'/home/advertise/list'
  })
}
// 品牌导航
export function getHomeNav(){
  return request({
    method:'get',
    url:'/brand/list',
    params:{pageSize:10}
  })
}


// 商品列表
export function getGoodsList(params){
  return request({
    method:'get',
    url:'/product/list',
    params
  })
}