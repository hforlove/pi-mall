<template>
  <goods-row
  :pic="goods.picture"
  :name="goods.name"
  :price="goods.price"
  @click.native="$router.push(`/detail?id=${goods.id}`)"
  >
    <template v-slot:m>
      <span>{{goods.sketch}}</span>
    </template>
    <template v-slot:br>
      已售 {{goods.total_sales}}<br />库存 {{goods.stock}}
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

</style>
