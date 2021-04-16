<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item
      v-for="item in list"
      :key="item.id"
    >
      <img :src="item.pic" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: 'Swiper',
  props:{
    list:{
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my-swipe{
  height: 100%;
  .van-swipe-item {
    img {
      width: 100%;
      height: 100%;
    }
  }
} 
</style>
