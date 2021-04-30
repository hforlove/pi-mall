<template>
  <div class="cate-child">
    <van-cell :title="data.title" is-link @click="toGoods(data.id)" />
    <ul class="tags">
      <li
        v-for="item in data.child"
        :key="item.id"
        @click="toGoods(item.id)"
      >
        <div><img :src="item.cover | imgUrl" /></div>
        <span>{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CategoryChild',
  props:{
    data:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    toGoods(id){
      this.$router.push({path:'/goods',query:{cate:id}})
    }
  }
}
</script>

<style lang="less" scoped>
.cate-child{
  padding-bottom: 20px;
  .tags{
    display: flex;
    flex-wrap: wrap;
    margin-top: -10px;
    .title{
      font-size: 16px;
      font-weight: bold;
      padding-left: 10px;
    }
    li{
      width: 33.33%;
      padding: 10px;
    }
    div{
      min-height: 82px;
    }
    img{
      width: 100%;
    }
    span{
      font-size: 12px;
      display: block;
      text-align: center;
    }
  }
}
</style>
