<template>
  <van-nav-bar
    :title="title"
    :left-arrow="showLeft"
    fixed
    @click-left="$router.go(-1)"
    @click-right="$router.push('/home')"
  >
    <template #right v-if="showRight">
      <slot name="right"><van-icon name="wap-home-o" size="18" /></slot>
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    showLeft:{
      type: Boolean,
      default: true
    },
    showRight:{
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
