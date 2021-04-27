<template>
  <div class="main">

    <nav-bar title="商品详情" />

    <swiper :list="swiperList" />

    <goods-detail-info
      ref="info"
      :info="detail"
      @addCart="addCart"
      @buyNow="buyNow"
      @onCollect="onCollect"
    />
    
    <van-divider
      :style="{ borderColor: '#666', padding: '0 30px' }"
    >
      商品详情
    </van-divider>
    
    <div class="detail" v-html="detail.intro"></div>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="parseInt($store.getters.cartNum)||''"
        @click="$router.push('/cart')"
      />
      <van-goods-action-button type="warning" text="加入购物车" @click="showSku" />
      <van-goods-action-button type="danger" text="立即购买" @click="showSku" />
    </van-goods-action>

  </div>
</template>

<script>

import Swiper from 'comp/Swiper'
import GoodsDetailInfo from './GoodsDetailInfo'

import { getGoodsDetail, addCart, createCollect, deleteCollect } from 'api'

export default {
  name: 'goodsDetail',
  components: { Swiper, GoodsDetailInfo },
  data() {
    return {
      id:'',
      detail:{},
      swiperList:[]
    }
  },
  created(){
    this.id = this.$route.query.id
    this.goodsDetail()
  },
  methods:{
    goodsDetail(){  //商品详情
      getGoodsDetail(this.id).then(res=>{
        this.detail= res.data
        res.data.covers.forEach((item,index)=>{
          this.swiperList.push({id:index,cover:item})
        })
      })
    },
    showSku(){  //选择商品规格
      this.$refs.info.show()
    },
    addCart(data){  //加入购物车
      const params = {
        num: data.selectedNum,
        sku_id: data.selectedSkuComb.id
      }
      addCart(params).then(_=>{ //更新购物车数量
        this.$store.dispatch('getCartNum')
      })
    },
    buyNow(data){ // 立即购买
      this.$router.push({
        path: '/orderCreate',
        query: {
          type: 'buy_now',
          ids: data.selectedSkuComb.id,
          num: data.selectedNum
        }
      })
    },
    onCollect(){  // 收藏/取消收藏
      if(this.detail.myCollect){
        this.deleteCollect(this.detail.myCollect.id)
      }else{
        this.createCollect()
      }
    },
    createCollect(){ // 收藏
      const params = {
        topic_id: this.id,
        topic_type: "product"
      }
      createCollect(params).then(res=>{
        this.$toast.success('收藏成功')
        this.detail.myCollect = res.data
      })
    },
    deleteCollect(id){ // 取消收藏
      deleteCollect(id).then(res=>{
        this.detail.myCollect = null
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main{
  z-index: 9;
  padding-bottom: 50px;
  padding-top: 96px;
}
.detail{
  width: 100%;
  overflow: hidden;
  ::v-deep{
    img{
      width: 100%;
    }
  }
}
</style>
