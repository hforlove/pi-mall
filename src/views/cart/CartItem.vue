<template>
  <van-swipe-cell>
    <div class="cart-teim">
      <div class="l">
        <van-checkbox v-model="cart.checked" />
      </div>
      <div class="r">
        <goods-row
          :pic="cart.product_img"
          :name="cart.product_name"
          :price="cart.price"
          :sku="cart.sku_name"
        >
          <template v-slot:br>
            <van-stepper @change="onUpdateCart(cart)" v-model="cart.number" />
          </template>
        </goods-row>
      </div>
    </div>
    <template #right>
      <van-button square text="删除" type="danger" class="delete-button" @click="onDelete(cart)" />
    </template>
  </van-swipe-cell>
</template>

<script>
import GoodsRow from 'comp/GoodsRow'
export default {
  name: 'CartItem',
  components: { GoodsRow },
  props:{
    cart:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  methods:{
    onUpdateCart(cart){
      this.$emit('updateCart',cart)
    },
    onDelete(cart){
      this.$emit('deleteCart',cart)
    }
  }

}
</script>

<style lang="less" scoped>
.delete-button{
  height: 100%;
}
.cart-teim{
  display: flex;
  .l{
    display: flex;
    width: 30px;
    justify-content: center;
    align-items: center;
  }
  .r{
    padding-left: 10px;
    flex: 1;
  }
}
</style>
