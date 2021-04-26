<template>
  <div class="main">
    <div class="profile-bg">
      <div class="info">
        <div class="img">
          <img :src="userInfo.head_portrait" />
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
  
  </div>
</template>

<script>
import ProfileItem from './ProfileItem'
import { getUserDetail } from 'api'
export default {
  name: 'profile',
  components: { ProfileItem },
  data() {
    return {
      show: true,
      userInfo:{}
    }
  },
  created(){
    getUserDetail().then(res=>{
      res.data.account.coupon_num = res.data.coupon_num
      this.userInfo = res.data
    })
  }
}
</script>

<style lang="less" scoped>
.main{
  padding-top: 0;
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
