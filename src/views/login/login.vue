<template>
  <div>
    <div class="login-banner">
      <div class="text">Hi~<br />PI商城欢迎你</div>
      <div class="logo"></div>
    </div>
    <div class="login-main">
      <van-tabs v-model="active">
        <van-tab name="login" title="登陆">
          <div class="tab-main">
            <login-block @onLogin="login" />
          </div>
        </van-tab>
        <van-tab name="register" title="注册">
          <div class="tab-main">
            <login-register :loading="loading" @onRegister="register" />
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>

import LoginBlock from './LoginBlock'
import LoginRegister from './LoginRegister'

import { login, register } from 'api'
import { setToken } from 'utils'
export default {
  name: '',
  components: { LoginBlock, LoginRegister },
  data() {
    return {
      loading:false,
      active:'login',
    }
  },
  methods:{
    login(params){  //登陆
      login(params).then(res=>{
        this.$toast.success('登陆成功')
        setToken(res.data.access_token)
        this.$router.push('/home')
      })
    },
    register(params){ //注册
      this.loading = true
      register(params).then(res=>{
        this.loading = false
        this.$toast.success('注册成功')
        this.active = 'login'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-main{
  width: 90%;
  padding:  0 20px 20px;
  margin: -30px auto;
  border-radius: 10px;
  background: #fff;
  position: relative;
  z-index: 2;
  .tab-main{
    padding-top: 20px;
  }
}
.login-banner{
  position: relative;
  height: 200px;
  background: @blue;
  color: #fff;
  .text{
    font-size: 24px;
    position: absolute;
    left: 20px;
    bottom: 40px;
  }
  .logo{
    width: 140px;
    height: 140px;
    position: absolute;
    right: 20px;
    bottom: 20px;
    background: url('~asset/images/cart.png');
    background-size: 100%;
  }
}
</style>
