<template>
  <van-empty
    description="空空如也"
    :image="image"
  >
  </van-empty>
</template>

<script>
import image from 'asset/images/empty.png'
export default {
  name: 'Empty',
  data() {
    return {
      image
    }
  },
}
</script>

<style lang="less">
.van-empty__image{
  width: 80px;
  height: 80px;
}
</style>
