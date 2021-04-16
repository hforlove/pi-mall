<template>
  <van-tabbar v-model="active">
    <van-tabbar-item name="home" icon="wap-home-o" to="/home">首页</van-tabbar-item>
    <van-tabbar-item name="category" icon="apps-o" to="/category">分类</van-tabbar-item>
    <van-tabbar-item name="cart" icon="shopping-cart-o" to="/cart" badge="">购物车</van-tabbar-item>
    <van-tabbar-item name="profile" icon="contact" to="/profile">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: "",
  data() {
    return {
    };
  },
  computed:{
      active:{
          get(){
              return this.$route.path.replace('/','')
          },
          set(){
          }

      }
  }
}
</script>

<style lang="less" scoped>
</style>
