<template>
  <div class="address_bar" @click="selectAddress">
    <van-icon name="location-o" />
    <div v-if="address" class="l">
      <p><span>{{name}}</span> {{tel}}</p>
      <div>
        {{address}}
      </div>
    </div>
    <div v-else class="l">请选择收货地址</div>
    <van-icon v-if="showArrow" name="arrow" />
  </div>
</template>

<script>
export default {
  name: 'OrderAddress',
  props: {
    showArrow: {
      type: Boolean,
      default: true
    },
    name: {
      type: String,
      default: ''
    },
    tel: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    }
  },
  methods: {
    selectAddress(){  // 选择地址
      this.showArrow && this.$router.push('/address')
    }
  }
}
</script>

<style lang="less" scoped>
.address_bar{
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
  position: relative;
  font-size: 14px;
  &:before{
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 2px;
    background: -webkit-repeating-linear-gradient(135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
    background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
    background-size: 80px;
    content: '';
  }
  .l{
    flex: 1;
    padding: 0 16px;
    p{
      padding-bottom: 10px;
    }
    span{
      color:#000;
    }
    div{
      color: @gray;
    }
  }
}
</style>
