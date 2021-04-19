<template>
  <van-form @submit="onSubmit" :show-error="false">
    <van-field
      size="large"
      v-model="userForm.mobile"
      name="手机号"
      label="手机号"
      placeholder="手机号"
      :rules="[rules.required]"
    />
    <van-field
      v-model="userForm.code"
      center
      clearable
      label="验证码"
      placeholder="验证码"
      :rules="[rules.required]"
    >
      <template #button>
        <van-button
          plain
          size="small"
          type="info"
          native-type="button"
          @click="onSendSms"
        >
          发送验证码
        </van-button>
      </template>
    </van-field>
    <van-field
      size="large"
      v-model="userForm.password"
      type="password"
      name="密码"
      label="密码"
      placeholder="密码"
      :rules="[rules.required]"
    />
    <van-field
      size="large"
      v-model="userForm.nickname"
      name="昵称"
      label="昵称"
      placeholder="昵称"
      :rules="[rules.required]"
    />
    <div class="login-btn">
      <van-button
        block
        type="info"
        native-type="submit"
        :loading="loading"
        :disabled="loading"
      >
        注册
      </van-button>
    </div>
  </van-form>
</template>

<script>
import { sendSmsCode } from 'api'
export default {
  name: '',
  props:{
    loading:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      userForm: {
        code:'',
        mobile: "",
        nickname: '',
        password: '',
        password_repetition:'',
        group: "tinyShopH5"
      }
    }
  },
  methods:{
    onSubmit(){
      this.userForm.password_repetition = this.userForm.password
      this.$emit('onRegister',this.userForm)
    },
    onSendSms(){
      if(!this.userForm.mobile){
        this.$toast('请输入手机号')
        return
      }
      sendSmsCode(this.userForm.mobile).then(res=>{
        this.userForm.code = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-btn{
  padding-top: 20px;
}
</style>
