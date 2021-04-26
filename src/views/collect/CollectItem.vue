<template>
  <van-swipe-cell>
    <goods-row
      :pic="collect.picture"
      :name="collect.name"
      :price="collect.minPriceSku.price"
      @click.native="$router.push(`/detail?id=${collect.id}`)"
    />
    <template #right>
      <van-button square text="删除" type="danger" class="delete-button" @click="onDelete(cid)" />
    </template>
  </van-swipe-cell>
</template>

<script>
import GoodsRow from 'comp/GoodsRow'
export default {
  name: 'CollectItem',
  components: { GoodsRow },
  props:{
    cid: {
      type: [String, Number],
      default: ''
    },
    collect:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    onDelete(id){
      this.$emit('onDelete',id)
    }
  }
}
</script>

<style lang="less" scoped>
.delete-button{
  height: 100%;
}
</style>
