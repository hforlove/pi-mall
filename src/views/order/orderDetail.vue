<template>
  <div class="main">

    <nav-bar title="订单详情" />

    <order-address
      :show-arrow="false"
      :name="order.receiver_name"
      :tel="order.receiver_mobile"
      :address="`${order.receiver_region_name} ${order.receiver_address}`"
    />

    <div class="list-wrap">

      <goods-row
        v-for="item in goodsList"
        :key="item.id"
        :pic="item.product_picture"
        :name="item.product_name"
        :price="item.product_original_money"
        :sku="item.sku_name"
      >
        <template #br>
          x{{item.num}}
        </template>
      </goods-row>
    </div>

    <div class="order-steps">
      <van-steps :active="active" active-icon="success" inactive-icon="arrow">
        <van-step>订单创建</van-step>
        <van-step>订单支付</van-step>
        <van-step>卖家发货</van-step>
        <van-step>买家收货</van-step>
      </van-steps>
    </div>

    <div class="info-row">
      <span>订单状态</span>
      <span class="red">{{orderStatus[order.order_status]}}</span>
    </div>
    <div class="info-row">
      <span>订单号</span>
      <span>{{order.order_sn}}</span>
    </div>
    <div class="info-row">
      <span>配送方式</span>
      <span class="red">{{order.shipping_explain}}</span>
    </div>
    <div class="info-row">
      <span>支付方式</span>
      <span class="red">{{order.payment_explain}}</span>
    </div>
    <div class="info-row">
      <span>实付金额</span>
      <span class="red">￥{{order.pay_money}}</span>
    </div>

  </div>
</template>

<script>
import GoodsRow from 'comp/GoodsRow'
import OrderAddress from './OrderAddress'
import { getOrderDetail } from 'api'
import { orderStatus } from 'utils/config'
export default {
  name: 'orderCreate',
  components: { GoodsRow, OrderAddress },
  data() {
    return {
      active: 0,
      orderStatus,
      order: {},
      goodsList: []
    }
  },
  created(){
    this.init()
  },
  methods:{
    init(){ // 初始化
      const { id } = this.$route.query
      this.getOrderDetail(id)
    },
    getOrderDetail(id){  // 获取订单详情
      getOrderDetail(id).then(res=>{
        this.order = res.data
        this.goodsList = res.data.product
        this.setSteps()
      })
    },
    setSteps(){
      switch (this.order.order_status) {
        case '0':
          this.active = 0
          break;
        case '1':
          this.active = 1
          break;
        case '2':
          this.active = 2
          break;
        case '3':
          this.active = 3
          break;
        case '4':
          this.active = 4
          break;
        default:
          this.active = 0
          break;
      }
    }
  }
}
</script>

<style lang="less" scoped>
.list-wrap{
  padding: 20px 10px;
}
.info-row{
  display: flex;
  justify-content: space-between;
  padding: 12px 20px;
  font-size: 12px;
  color: @gray;
}
.order-steps{
  padding: 0 16px;
}
</style>
