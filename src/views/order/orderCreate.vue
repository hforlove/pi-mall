<template>
  <div class="main">

    <nav-bar title="创建订单" />

    <order-address
      :tel="address.mobile"
      :name="address.realname"
      :address="address.address ? address.address : `${address.address_name} ${address.address_details}`"
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

    <van-field label-width="40" v-model="remark" label="备注" placeholder="请输备注信息" />

    <van-submit-bar text-align="left" label="实付款：" :price="price" button-text="提交订单" @submit="onSubmit" />

  </div>
</template>

<script>
import GoodsRow from 'comp/GoodsRow'
import OrderAddress from './OrderAddress'
import { getOrderPreview, createOrder } from 'api'
export default {
  name: 'orderCreate',
  components: { GoodsRow, OrderAddress },
  data() {
    return {
      address: {},
      goodsList: [],
      remark: ''
    }
  },
  computed:{
    price(){
      return this.goodsList.reduce((prev,cur) => prev + cur.num * cur.price * 100, 0)
    }
  },
  created(){
    this.init()
  },
  methods:{
    init(){ // 初始化
      const { type, ids, num, source } = this.$route.query
      this.type = type
      this.ids = ids
      this.num = num
      this.source = source
      const params = {
        type,
        data: this.num ? `{"sku_id":${ids},"num":${num}}` : ids
      }
      this.getOrderPreview(params)
    },
    onSubmit(){ //提交订单
      const params = {
        address_id: this.address.id,
        buyer_message: this.remark,
        data: this.num ? `{"sku_id":${this.ids},"num":${this.num}}` : this.ids,
        shipping_type: 1,
        type: this.type
      }
      createOrder(params).then(res=>{
        this.$store.dispatch('getCartNum')
        this.$store.commit('setOrderPreview',{})
        this.$router.push(`/pay?id=${res.data.id}`)
      })
    },
    getOrderPreview(params){  // 获取订单预览数据
      const orderPreview = this.$store.state.orderPreview
      getOrderPreview(params).then(res=>{
        this.goodsList = res.data.products
        if(this.source && orderPreview?.address?.mobile){
          this.address = { ...orderPreview.address }
        }else{
          this.address = res.data.address
          const tmp = {type:this.type,ids:this.ids}
          this.num && (tmp.num = this.num)
          this.$store.commit('setOrderPreview',tmp)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.list-wrap{
  padding: 0 10px 40px 0;
}
</style>
