<template>
  <div class="main">
    <van-nav-bar title="PI 商城" fixed>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <div class="swiper_wrap">
      <Swiper :list="swiperList" />
    </div>
    <home-nav :list="navList" />
    <home-goods title="新品推荐" :list="newList" />
    <home-goods title="人气推荐" :list="hotList" />
  </div>
</template>

<script>

import Swiper from 'comp/Swiper'
import HomeNav from './HomeNav'
import HomeGoods from './HomeGoods'

import { getHomeSwiper, getHomeNav, getGoodsList } from 'api'

export default {
  name: 'home',
  components:{ Swiper, HomeNav, HomeGoods },
  data() {
    return {
      swiperList:[],
      navList:[],
      newList:[],
      hostList:[]
    }
  },
  created(){
    getHomeSwiper().then(res=>{
      this.swiperList = res.list
    })
    getHomeNav().then(res=>{
      this.navList = res.list
    })
    getGoodsList({pageNum:1,pageSize:6}).then(res=>{
      this.newList = res.list
    })
    getGoodsList({pageNum:2,pageSize:6}).then(res=>{
      this.hotList = res.list
    })
  }
}
</script>

<style lang="less" scoped>
.swiper_wrap{
  height: 170px;
  overflow: hidden;
}
</style>
