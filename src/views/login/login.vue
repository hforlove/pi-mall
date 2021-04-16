<template>
  <div>
    <van-nav-bar :title="isLogin?'登陆':'注册'">
      <template #right>
        <van-icon name="wap-home" size="18" />
      </template>
    </van-nav-bar>
    <div class="login_form">
      <van-form @submit="onSubmit">
        <van-field
          size="large"
          v-model="userForm.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
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
        <div class="login_btn">
          <span @click="changeType">立即{{isLogin?'注册':'登陆'}}</span>
          <van-button block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { login, register } from 'api'
import { setToken } from 'utils'
export default {
  name: '',
  data() {
    return {
      isLogin:true,
      userForm: {
        username: '',
        password: ''
      }
    }
  },
  methods:{
    changeType(){
      this.$notify('请联系IT人员')
      // this.userForm.username = ''
      // this.userForm.password = ''
      // this.isLogin = !this.isLogin
    },
    onSubmit(){
      if(this.isLogin){
        login(this.userForm).then(res=>{
          setToken(res.token)
          this.$router.push('/home')
        })
      }else{
        register(this.userForm).then(res=>{
          console.log(res)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login_form{
  padding: 30px;
}
.login_btn{
  >span{
    display: inline-block;
    margin-left: 16px;
    margin-bottom: 20px;
    color: @blue;
    font-size: 12px;
  }
}
</style>
