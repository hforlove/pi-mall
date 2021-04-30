<template>
  <div class="main">
    <div class="setting" @click="show = true"><van-icon name="setting-o" /></div>
    <div class="profile-bg">
      <div class="info">
        <div class="img">
          <img :src="userInfo.head_portrait | imgUrl" />
        </div>
        <span>{{userInfo.nickname}}</span>
        <van-icon size="20" name="edit" @click="$router.push('/userInfo')" />
      </div>
    </div>
    
    <profile-item
      :account="userInfo.account"
      :count="userInfo.order_synthesize_num"
      class="profile-cont"
    />
  
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
      <div class="popup-setting">
        <van-button block round type="danger" @click="logout">退出登录</van-button>
      </div>
    </van-popup>

  </div>
</template>

<script>
import ProfileItem from './ProfileItem'
import { getUserDetail, logout } from 'api'
import { removeToken } from 'utils'
export default {
  name: 'profile',
  components: { ProfileItem },
  data() {
    return {
      show: false,
      userInfo:{}
    }
  },
  created(){
    getUserDetail().then(res=>{
      res.data.account.coupon_num = res.data.coupon_num
      this.userInfo = res.data
    })
  },
  methods: {
    logout() {
      logout().then(res=>{
        removeToken()
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main{
  padding-top: 0;
  position: relative;
}
.setting{
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 9;
  color: #fff;
}
.popup-setting{
  height: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
}
.profile-bg{
  height: 220px;
  background: @lightRed;
  position: relative;
  color: #fff;
  .info{
    height: 100%;
    padding: 0 20px 40px;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 2;
    .img{
      width: 62px;
      height: 62px;
      overflow: hidden;
      border-radius: 50%;
      margin-right: 16px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    >span{
      margin-right: 10px;
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
.profile-cont{
  width: 100%;
  margin-top: -40px;
  background: #fff;
  position: relative;
  z-index: 1;
}
</style>
