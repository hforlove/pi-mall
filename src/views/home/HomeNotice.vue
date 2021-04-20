<template>
  <van-notice-bar left-icon="volume-o" :scrollable="false">
    <van-swipe
      vertical
      class="notice-swipe"
      :autoplay="3000"
      :show-indicators="false"
    >
      <van-swipe-item
        v-for="item in list"
        :key="item.id"
      >
        {{item.title}}
      </van-swipe-item>
    </van-swipe>
  </van-notice-bar>
</template>

<script>
export default {
  name: 'HomeNotice',
  props:{
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
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
</style>
