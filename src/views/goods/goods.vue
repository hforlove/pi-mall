<template>
  <div class="main">

    <goods-search
      v-show="searchShow"
      @onSearch="searchGoods"
      @onBack="backBySearch"
      ref="goodsSearch"
    />

    <van-nav-bar left-arrow fixed @click-left="$router.go(-1)">
      <template #title>
        <van-field
          @click="showSearch"
          :value="query.keyword"
          disabled
          placeholder="请输入搜索关键词"
        />
      </template>
    </van-nav-bar>

    <van-list
      v-model="loading"
      finished-text="没有更多了"
      :offset="60"
      :immediate-check="false"
      :finished="finished"
      @load="onLoad"
    >
      <goods-item
        v-for="item in goodsList"
        :key="item.id"
        :goods="item"
      />
    </van-list>
  </div>
</template>

<script>
import GoodsSearch from './GoodsSearch'
import GoodsItem from './GoodsItem'
import { getGoodsList } from 'api'
export default {
  name: 'goods',
  components: { GoodsSearch, GoodsItem },
  data() {
    return {
      searchShow:true,
      loading:false,
      finished: false,
      nextPage: true,
      back: true,
      keyword:'',
      query: {
        keyword: '',
        page: 1,
        cate_id: ''
      },
      goodsList:[]
    }
  },
  created(){
    const cate = this.$route.query.cate
    if(cate){
      this.query.cate_id = this.$route.query.cate
      this.searchShow = false
    }
    this.getGoodsList()
  },
  methods:{
    backBySearch(){ //返回上一层
      if(this.back){
        this.$router.go(-1)
      }else{
        this.searchShow = false
      }
    },
    showSearch(){
      this.back = false
      this.searchShow = true
      this.$refs.goodsSearch.focus()
    },
    searchGoods(keyword){
      this.query.keyword = keyword
      this.query.page = 1
      this.searchShow = false
      this.finished = false
      this.nextPage = true
      this.goodsList = []
      this.getGoodsList()
    },
    getGoodsList(){
      this.loading = true
      getGoodsList(this.query).then(res=>{
        this.loading = false
        this.goodsList.push(...res.data)
        if(res.data.length<12){
          this.nextPage = false
          this.finished = true
        }
      })
    },
    onLoad(){
      if(this.nextPage){
        this.query.page++
        this.getGoodsList()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main{
  position: relative;
  background: #fff;
  z-index: 9;
  padding-bottom: 0;
  min-height: 100vh;
}
</style>
