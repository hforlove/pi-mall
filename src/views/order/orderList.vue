<template>
  <div class="main-top">

    <nav-bar title="我的订单" />

    <div class="order-tab">
      <van-tabs v-model="active" @change="changeTab">
        <van-tab title="全部" name="-1"></van-tab>
        <van-tab title="待付款" name="0"></van-tab>
        <van-tab title="待发货" name="1"></van-tab>
        <van-tab title="待收货" name="2"></van-tab>
        <van-tab title="评价" name="3"></van-tab>
      </van-tabs>
    </div>

    <div class="order-list">
      <van-list
        v-model="loading"
        finished-text="没有更多了"
        :offset="60"
        :immediate-check="false"
        :finished="finished"
        @load="onLoad"
      >
        <order-list-item
          v-for="item in orderList"
          :key="item.id"
          :order="item"
          @onDelete="deleteOrder"
          @onClose="closeOrder"
          @onReceive="deliveryOrder"
        />
      </van-list>
    </div>

  </div>
</template>

<script>
import OrderListItem from './OrderListItem'
import { getOrder, deleteOrder, closeOrder, deliveryOrder } from 'api'
export default {
  name: 'orderList',
  components: { OrderListItem },
  data() {
    return {
      active: '-1',
      loading:false,
      finished: false,
      nextPage: true,
      orderList: [],
      query: {
        page: 1,
        synthesize_status: ''
      },
    }
  },
  created(){
    const { state } = this.$route.query
    this.active = state ? state : '-1'
    this.getOrder()
  },
  methods:{
    getOrder(){ // 获取订单列表
      this.loading = true
      this.query.synthesize_status = this.active > -1 ? this.active : ''
      getOrder(this.query).then(res=>{
        this.loading = false
        this.orderList.push(...res.data)
        if(res.data.length<12){
          this.nextPage = false
          this.finished = true
        }
      })
    },
    onLoad(){ // 加载更多
      if(this.nextPage){
        this.query.page++
        this.getOrder()
      }
    },
    changeTab(){  // 切换tab
      this.finished = false
      this.nextPage = true
      this.query.page = 1
      this.orderList = []
      this.getOrder()
    },
    deleteOrder(id){  // 删除订单
      deleteOrder(id).then(res=>{
        const index = this.orderList.findIndex(item=>item.id == id)
        this.orderList.splice(index,1)
      })
    },
    closeOrder(order){  // 取消订单
      closeOrder(order.id).then(res=>{
        order.order_status = -4
      })
    },
    deliveryOrder(order){  // 确认收货
      deliveryOrder(order.id).then(res=>{
        order.order_status = 3
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main-top{
  padding-top: 100px;
}
.order-tab{
  width: 100%;
  position: fixed;
  top: 46px;
  background: #fff;
  z-index: 2;
}
.order-list{
  padding: 0 20px;
}
</style>
