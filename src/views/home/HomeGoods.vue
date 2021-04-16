<template>
  <div class="goods_block">
    <h3>{{title}}</h3>
    <ul>
      <li v-for="item in list" :key="item.id">
        <Goods :goods="item" />
      </li>
    </ul>
  </div>
</template>

<script>

import Goods from 'comp/Goods'

export default {
  name: '',
  components: { Goods },
  props:{
    title:{
      type:String,
      default:''
    },
    list:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.goods_block{
  h3{
    height: 62px;
    line-height: 56px;
    text-align: center;
    font-size: 18px;
    color: #ff6522;
  }
  ul{
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
  }
  li{
    width: 50%;
    padding: 0 5px 10px;
  }
}
</style>
