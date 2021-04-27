<template>
  <div class="order-item">
    <div class="no">
      <span>订单号：{{order.order_sn}}</span>
      <span>{{orderStatus[order.order_status]}}</span>
    </div>
    <div class="list">
      <goods-row
        v-for="item in order.product"
        :key="item.id"
        :price="item.price"
        :pic="item.product_picture"
        :name="item.product_name"
        :sku="item.sku_name"
        @click.native="$router.push(`/detail?id=${item.product_id}`)"
      >
        <template #br>
          x{{item.num}}
        </template>
      </goods-row>
    </div>
    <div class="info">
      共<span> {{order.product_count}} </span>件商品 实付款 ￥<span>{{order.pay_money}}</span>
    </div>
    <div class="btn">
      <van-button
        v-if="order.order_status == 0"
        size="mini"
        type="default"
        @click="onClose(order)"
      >
        取消订单
      </van-button>
      <van-button
        v-if="order.order_status == -4"
        size="mini"
        type="default"
        @click="onDelete(order.id)"
      >
        删除订单
      </van-button>
      <van-button
        size="mini" 
        type="danger"
        @click="$router.push(`/orderDetail?id=${order.id}`)"
      >
        订单详情
      </van-button>
      <van-button
        v-if="order.order_status == 0 || order.order_status == 202"
        size="mini" 
        type="danger"
        @click="$router.push(`/pay?id=${order.id}`)"
      >
        立即支付
      </van-button>
      <van-button
        v-if="order.order_status == 2"
        size="mini" 
        type="danger"
        @click="onReceive(order)"
      >
        确认收货
      </van-button>
    </div>
  </div>
</template>

<script>
import GoodsRow from 'comp/GoodsRow'
import { orderStatus } from 'utils/constData.js'

export default {
  name: 'OrderListItem',
  components: { GoodsRow },
  props: {
    order: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
      orderStatus
    }
  },
  methods: {
    onDelete(id){
      this.$emit('onDelete',id)
    },
    onClose(order){
      this.$emit('onClose',order)
    },
    onReceive(order){
      this.$emit('onReceive',order)
    }
  }
}
</script>

<style lang="less" scoped>
.order-item{
  font-size: 14px;
  padding-bottom: 20px;
  .no{
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span:last-child{
      color: @red;
    }
  }
  .info{
    text-align: right;
    padding-top: 10px;
    font-size: 12px;
    color: @gray;
    span{
      font-size: 14px;
    }
  }
  .btn{
    text-align: right;
    padding: 10px 0;
  }
}
</style>
