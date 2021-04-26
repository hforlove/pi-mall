<template>
  <div class="main">

    <nav-bar title="购物车" />

    <div class="cart-wrap">
      <cart-item
        v-for="item in cartList"
        :key="item.id"
        :cart="item"
        @deleteCart="deleteCart"
        @updateCart="updateCart"
      />
    </div>

    <empty v-show="!cartList.length" />

    <van-submit-bar :price="totalPrice" button-text="结算" @submit="onSubmit">
      <van-checkbox v-model="checked" @click="selectAll">全选</van-checkbox>
    </van-submit-bar>

  </div>
</template>

<script>
import Empty from 'comp/Empty'
import CartItem from './CartItem'
import { getCart, updateCart, deleteCart } from 'api'
export default {
  name: 'cart',
  components: { Empty, CartItem },
  data() {
    return {
      checked: true,
      cartList: []
    }
  },
  computed:{
    totalPrice(){
      const checks = this.cartList.filter(item => item.checked)
      if (checks.length > 0) {
        return checks.reduce((prev, cur) => {
          return prev + cur.number * cur.price * 100
        }, 0)
      }
      return 0
    }
  },
  created(){
    this.getCart()
  },
  methods:{
    getCart(){
      getCart().then(res=>{
        res.data.map(item=>{
          item.checked = true
        })
        this.cartList = res.data
      })
    },
    selectAll(){
      this.cartList.map(item=>{
        item.checked = this.checked
      })
    },
    updateCart(cart){ //更新购物车单个商品数量
      const params = {
        num: cart.number,
        sku_id: cart.sku_id
      }
      updateCart(params)
      .then(_=>{})
      .catch(_=>{
        this.cartList.find(item=>item == cart).number = cart.number - 1
      })
    },
    deleteCart(cart){ // 删除购物车商品
      const params = {
        sku_ids: `[${cart.sku_id}]`
      }
      deleteCart(params).then(res=>{
        const index = this.cartList.findIndex(item=>item == cart)
        this.cartList.splice(index,1)
        this.$store.dispatch('getCartNum')
      })
    },
    onSubmit(){
      const ids = this.cartList.filter(item=>item.checked).map(item=>item.id)
      this.$router.push({
        path:'/orderCreate',
        query:{
          type:'cart',
          ids:ids.join(',')
        }
      })
    }
  },
  watch: {
    totalPrice(){
      this.checked = !this.cartList.find(item=>item.checked==false)
    }
  }
}
</script>

<style lang="less" scoped>
.cart-wrap{
  padding: 0 16px;
}
</style>
