<template>
  <div class="goods" @click="$router.push(`/detail?id=${goods.id}`)">
    <img :src="goods.picture" alt="">
    <p>{{goods.name}}</p>
    <span>￥{{goods.price}}</span>
  </div>
</template>

<script>
export default {
  name: '',
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
.goods{
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  img{
    width: 100%;
    margin: 0 auto;
  }
  p{
    margin-top: 6px;
    height: 26px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    padding: 0 10px;
    font-size: 12px;
  }
  span{
    padding: 10px;
    font-size: 14px;
    color: @red;
  }
}
</style>
