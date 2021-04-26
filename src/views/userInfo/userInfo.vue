<template>
  <div class="main">
    <div class="profile-bg">
      <van-icon class="back" name="arrow-left" @click="$router.go(-1)" />
      <div class="img">
        <img :src="userInfo.head_portrait" />
      </div>
    </div>

    <div class="user-form">
      <van-form @submit="onSubmit">
        <van-field
          v-model="userInfo.mobile"
          name="mobile"
          label="手机号"
          readonly
        />
        <van-field
          v-model="userInfo.nickname"
          name="nickname"
          label="昵称"
          placeholder="请输入昵称"
          :rules="[rules.required]"
        />
        <van-field
          v-model="userInfo.realname"
          name="realname"
          label="姓名"
          placeholder="请输入姓名"
          :rules="[rules.required]"
        />
        <van-field name="gender" label="性别">
          <template #input>
            <van-radio-group v-model="userInfo.gender" direction="horizontal">
              <van-radio name="0">未知</van-radio>
              <van-radio name="1">男</van-radio>
              <van-radio name="2">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          readonly
          clickable
          name="birthday"
          :value="userInfo.birthday"
          label="生日"
          placeholder="点击选择日期"
          @click="showCalendar = true"
        />
        <van-field
          v-model="userInfo.qq"
          name="qq"
          label="QQ"
          placeholder="QQ"
          :rules="[rules.required]"
        />
        <van-field
          v-model="userInfo.email"
          name="email"
          label="邮箱"
          placeholder="请输入邮箱"
          :rules="[rules.required]"
        />
        <div style="margin: 16px;">
          <van-button round block type="danger" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
    
    <van-calendar
      :default-date="new Date(userInfo.birthday)"
      :min-date="new Date('1971-01-01')"
      v-model="showCalendar"
      @confirm="selectDate"
    />

  </div>
</template>

<script>
import { getUserDetail, updateUser } from 'api'
import dayjs from "dayjs"
export default {
  name: 'userInfo',
  data() {
    return {
      showCalendar: false,
      userInfo: {}
    }
  },
  created(){
    getUserDetail().then(res=>{
      this.userInfo = res.data
    })
  },
  methods: {
    onSubmit(){ // 更新个人信息
      updateUser(this.userInfo).then(res=>{
        this.$toast.success('个人资料更新成功')
      })
    },
    selectDate(date){ // 选择日期
      this.userInfo.birthday = dayjs(date).format("YYYY-MM-DD")
      this.showCalendar = false;
    }
  }
}
</script>

<style lang="less" scoped>
.main{
  padding: 0;
  z-index: 9;
}
.profile-bg{
  height: 220px;
  background: @lightRed;
  position: relative;
  padding-top: 40px;
  .back{
    position: absolute;
    left: 10px;
    top: 10px;
    color: #fff;
    z-index: 9;
  }
  .img{
    margin: 0 auto;
    width: 80px;
    height: 80px;
    overflow: hidden;
    border-radius: 50%;
    border: 2px solid #fff;
    img{
      width: 100%;
      height: 100%;
    }
  }
  &::after,&::before{
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    background-image: url('~asset/images/user-bg.png');
    background-size: 100% 100%;
    left: 0;
    top: 0;
  }
}
.user-form{
  position: relative;
  z-index: 1;
  background: #fff;
  margin-top: -60px;
  padding: 10px 30px;
}
</style>
