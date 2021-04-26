<template>
  <div class="main">

    <goods-list-search
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

    <goods-list-sort
      ref="goodsListSort"
      class="goods-sort"
      @showFilter="filterShow=true"
      @sort="sortGoods"
    />

    <van-list
      v-model="loading"
      finished-text="没有更多了"
      :offset="60"
      :immediate-check="false"
      :finished="finished"
      @load="onLoad"
    >
      <goods-list-item
        v-for="item in goodsList"
        :key="item.id"
        :goods="item"
      />
    </van-list>

    <goods-list-filter v-model="filterShow" @filter="filterGoods" />

  </div>
</template>

<script>
import GoodsListSearch from './GoodsListSearch'
import GoodsListItem from './GoodsListItem'
import GoodsListSort from './GoodsListSort'
import GoodsListFilter from './GoodsListFilter'
import { getGoodsList } from 'api'
export default {
  name: 'goods',
  components: { GoodsListSearch, GoodsListItem, GoodsListSort, GoodsListFilter },
  data() {
    return {
      filterShow:false,
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
      orderQuery:{},
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
    backBySearch(){ // 返回上一层
      if(this.back){
        this.$router.go(-1)
      }else{
        this.searchShow = false
      }
    },
    showSearch(){ // 搜索弹窗
      this.back = false
      this.searchShow = true
      this.$refs.goodsSearch.focus()
    },
    searchGoods(keyword){ // 点击搜索
      this.query.keyword = keyword
      this.resetQuery()
    },
    sortGoods(params){  // 排序
      this.orderQuery = params
      this.resetQuery()
    },
    filterGoods(params){  //筛选
      this.filterShow = false
      this.orderQuery = params
      this.$refs.goodsListSort.reset()
      this.resetQuery()
    },
    resetQuery(){ // 重置初始化
      this.query.page = 1
      this.searchShow = false
      this.finished = false
      this.nextPage = true
      this.goodsList = []
      this.getGoodsList()
    },
    getGoodsList(){ // 商品列表
      this.loading = true
      const params = {
        ...this.query,
        ...this.orderQuery
      }
      getGoodsList(params).then(res=>{
        this.loading = false
        this.goodsList.push(...res.data)
        if(res.data.length<12){
          this.nextPage = false
          this.finished = true
        }
      })
    },
    onLoad(){ //加载更多
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
  z-index: 9;
  padding-bottom: 0;
  padding-top: 96px;
}
.goods-sort{
  position: fixed;
  width: 100%;
  background: #fff;
  top: 46px;
  z-index: 2;
}
</style>
