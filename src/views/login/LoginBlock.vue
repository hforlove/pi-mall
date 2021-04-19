<template>
  <van-form @submit="onSubmit">
    <van-field
      size="large"
      v-model="userForm.mobile"
      name="手机号"
      label="手机号"
      placeholder="手机号"
      :rules="[{ required: true, message: '请填写手机号' }]"
    />
    <van-field
      size="large"
      v-model="userForm.password"
      type="password"
      name="密码"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div class="login-btn">
      <van-button block type="info" native-type="submit">登陆</van-button>
    </div>
  </van-form>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      userForm: {
        group: "tinyShopH5",
        mobile: '',
        password: ''
      }
    }
  },
  methods:{
    onSubmit(){
      this.$emit('onLogin',this.userForm)
    }
  }
}
</script>

<style lang="less" scoped>
.login-btn{
  padding-top: 20px;
}
</style>
