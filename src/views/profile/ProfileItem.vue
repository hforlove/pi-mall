<template>
  <div>
    <div class="profile-item">
      <van-cell title="我的账户" icon="card" />
      <ul class="acount">
        <li>
          <p>{{account.user_money}}</p>余额
        </li>
        <li>
          <p>{{account.coupon_num}}</p>优惠券
        </li>
        <li>
          <p>{{account.user_integral}}</p>积分
        </li>
      </ul>
    </div>
    <div class="profile-item">
      <van-cell title="全部订单" is-link icon="balance-list" to="/order" />
      <van-grid :column-num="5">
        <van-grid-item icon="balance-pay" text="待付款" :badge="count['0']*1||''" to="/order?state=0" />
        <van-grid-item icon="logistics" text="待发货" :badge="count['1']*1||''" to="/order?state=1" />
        <van-grid-item icon="completed" text="待收货" :badge="count['2']*1||''" to="/order?state=2" />
        <van-grid-item icon="flower-o" text="评价" :badge="count['3']*1||''" to="/order?state=3" />
        <van-grid-item icon="after-sale" text="售后" :badge="count['-1']*1||''" />
      </van-grid>
    </div>
    <div class="profile-item">
      <van-cell title="我的服务" icon="service" />
      <van-grid :column-num="3">
        <van-grid-item icon="star-o" text="我的收藏" to="/collect" />
        <van-grid-item icon="coupon-o" text="领劵中心" to="/coupon" />
        <van-grid-item icon="location-o" text="地址管理" to="/address" />
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileItem',
  props: {
    account: {
      type: Object,
      default(){
        return {}
      }
    },
    count: {
      type: Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.profile-item{
  padding: 10px;
  ::v-deep{
    .van-cell__left-icon{
      font-size: 24px;
      color: @red;
      margin-right: 10px;
    }
    .van-grid-item__icon{
      color: @red;
    }
  }
  .acount{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    padding-top: 10px;
    li{
      flex: 1;
      text-align: center;
      color: @gray;
    }
    p{
      color: @red;
      font-size: 14px;
      padding-bottom: 4px;
    }
  }
}
</style>
