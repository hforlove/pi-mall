<template>
  <goods-row :goods="goods">
    <template v-slot:m>
      <span class="sketch">{{goods.sketch}}</span>
    </template>
    <template v-slot:br>
      <div class="sales">已售 {{goods.total_sales}}<br />库存 {{goods.stock}}</div>
    </template>
  </goods-row>
</template>

<script>
import GoodsRow from 'comp/GoodsRow'
export default {
  name: 'GoodsList',
  components: { GoodsRow },
  props:{
    goods:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.sketch{
  font-size: 12px;
  color: @gray;
}
.sales{
  color: @gray;
  font-size: 12px;
}
</style>
