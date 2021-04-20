<template>
  <div class="main">

    <van-nav-bar title="PI 商城" fixed  @click-right="$router.push('/goods')">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <div class="swiper_wrap">
      <Swiper :list="swiperList" />
    </div>

    <home-nav :list="navList" />

    <home-notice :list="noticeList" />

    <home-goods title="新品" :list="newList" />
    <home-goods title="热门" :list="hotList" />
    <home-goods title="推荐" :list="recommenList" />
  </div>
</template>

<script>

import Swiper from 'comp/Swiper'
import HomeNav from './HomeNav'
import HomeGoods from './HomeGoods'
import HomeNotice from './HomeNotice'

import { getHomeData } from 'api'

export default {
  name: 'home',
  components:{ Swiper, HomeNav, HomeGoods, HomeNotice },
  data() {
    return {
      swiperList:[],
      navList:[],
      noticeList:[],
      newList:[],
      hotList:[],
      recommenList:[]
    }
  },
  created(){
    getHomeData().then(res=>{
      const data = res.data
      this.swiperList = data.adv.index_top
      this.navList = data.cate
      this.noticeList = data.announce
      this.newList = data.product_new
      this.hotList = data.product_hot
      this.recommenList = data.product_recommend
      this.$store.commit('initHotSearch',data.search.hot_search_list)
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
