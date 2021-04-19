<template>
  <div class="goods-row">
    <div class="img">
      <img :src="goods.picture" />
    </div>
    <div class="cont">
      <h3 class="top">{{goods.name}}</h3>
      <div class="mid"><slot name="m"></slot></div>
      <div class="bottom">
        ￥{{goods.price}}
        <div class="br"><slot name="br"></slot></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsRow',
  props:{
    goods:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.goods-row{
  width: 100%;
  height: 108px;
  display: flex;
  padding: 12px 0;
  .img{
    width: 88px;
    height: 100%;
    overflow: hidden;
    border-radius: 4px;
    img{
      width: 100%;
    }
  }
  .cont{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 10px;
    flex:1;
    overflow: hidden;
    .top{
      height: 30px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-size: 13px;
      line-height: 16px;
      font-weight: normal;
      color: #323233;
    }
    .mid{
      height: 26px;
      line-height: 18px;
      overflow: hidden;
    }
    .bottom{
      font-size: 14px;
      color: @red;
      position: relative;
      .br{
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
  }
}
</style>
