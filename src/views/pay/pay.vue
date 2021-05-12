<template>
  <div class="pay-index">
    <nav-bar title="支付" />
    <div class="pay-bg">
      <div class="before" v-show="!payed">
        支付金额
        <p>￥{{pay_money}}</p>
      </div>
      <div class="after" v-show="payed">
        <van-icon size="60" color="#fff" name="checked" />
        <div>
          <p>支付成功！</p>
          感谢你的购买
        </div>
      </div>
    </div>

    <div class="pay-type" v-show="!payed">
      <van-radio-group v-model="pay_type">
        <van-cell-group>
          <van-cell title="微信支付" clickable @click="pay_type = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="支付宝支付" clickable @click="pay_type = 2">
            <template #right-icon>
              <van-radio :name="2" />
            </template>
          </van-cell>
          <van-cell title="预存款支付" clickable @click="pay_type = 5">
            <template #right-icon>
              <van-radio :name="5" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>

      <div class="pay-btn">
        <van-button block round type="danger" @click="payOrder">确认支付</van-button>
      </div>
    </div>

    <div class="pay-success" v-show="payed">
      <h3>￥2100</h3>
      <p><span>订单编号：</span>{{payInfo.order_sn}}</p>
      <p><span>下单时间：</span>{{payInfo.pay_time}}</p>
      <p><span>支付方式：</span>{{payInfo.payment_explain}}</p>
      <p><span>配送方式：</span>{{payInfo.shipping_explain}}</p>
      <p><span>订单状态：</span>待发货</p>
      <div class="pay-btn">
        <van-button block round type="danger">查看订单</van-button>
        <van-button block round>返回首页</van-button>
      </div>
    </div>

  </div>
</template>

<script>
import { getOrderByPay, payOrder } from 'api'
export default {
  name: '',
  data() {
    return {
      pay_type: 5,
      pay_money: 0,
      payInfo: {}
    }
  },
  computed:{
    payed(){
      return this.payInfo.pay_status == 1
    }
  },
  created(){
    this.orderId = this.$route.query.id
    if(this.orderId) this.getOrder()
  },
  methods:{
    getOrder(){ // 付款信息
      getOrderByPay({simplify:1, id: this.orderId}).then(res=>{
        this.pay_money = res.data.pay_money
        this.payInfo = res.data
      })
    },
    payOrder(){ // 支付
      if(this.pay_type == 1 ){
        this.$toast('暂不支持')
        return
      }
      const params = {
        data: `{"order_id":${this.orderId}}`,
        order_group: "order",
        pay_type: this.pay_type,
        trade_type: this.pay_type==5 ? "js" : "wap",
      }
      payOrder(params).then(res=>{
        this.$toast.success('支付成功')
        this.$router.push('/profile')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.pay-index{
  position: relative;
  min-height: 100vh;
  background: #fff;
  z-index: 9;
  ::v-deep .van-nav-bar{
    background: none;
    .van-icon, .van-nav-bar__title{
      color: #fff !important;
    }
  }
}
.pay-success{
  width: 90%;
  margin: 0 auto;
  padding: 0 20px 20px;
  background: #fff;
  border-radius: 10px;
  position: relative;
  top: -40px;
  font-size: 14px;
  h3{
    font-size: 22px;
    text-align: center;
    font-weight: normal;
    padding: 16px 0 10px;
  }
  p{
    padding: 12px 0;
    span{
      color: @gray;
    }
  }
  .pay-btn{
    padding: 40px 0px;
  }
}
.pay-type{
  padding: 20px 30px;
}
.pay-btn{
  padding: 40px 30px;
}
.pay-bg{
  height: 230px;
  background: @red;
  position: relative;
  overflow: hidden;
  color: #fff;
  >img{
    width: 100%;
    height: 100%;
  }
  &::before,&::after{
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-image: url('~asset/images/money-bg.png');
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .before{
    height: 100%;
    display: flex;
    padding-top: 40px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    p{
      font-size: 34px;
      padding-top: 10px;
    }
  }
  .after{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    p{
      font-size: 18px;
    }
    div{
      padding-left: 10px;
      font-size: 12px;
    }
  }
}
</style>
