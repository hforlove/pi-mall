<template>
  <div class="search-wrap">
    <van-nav-bar left-arrow @click-left="onClickLeft">
      <template #title>
        <van-field
          ref="search"
          clearable
          v-model="keyword"
          placeholder="请输入搜索关键词"
        />
      </template>
      <template #right>
        <span @click="onSearch">搜索</span>
      </template>
    </van-nav-bar>
    <div class="search-item" v-if="historySearchKey.length">
      <div class="tag">
        最近搜索
        <span @click="removeHistorySearch"><van-icon name="delete-o" /></span>
      </div>
      <div class="item">
        <span
          v-for="item in historySearchKey"
          :key="item"
          @click="setSearch(item)"
        >
          {{item}}
        </span>
      </div>
    </div>
    <div class="search-item">
      <div class="tag">
        热门搜索
      </div>
      <div class="item">
        <span
          v-for="(item,index) in hotSearchKey"
          :key="item"
          :class="{'act': index < 3}"
          @click="setSearch(item)"
        >
          {{item}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { setStore, getStore, removeStore } from 'utils'
export default {
  name: 'GoodsSearch',
  data() {
    return {
      keyword:'',
      historySearchKey:getStore('historySearch',true)||[]
    }
  },
  computed:{
    hotSearchKey(){
      return this.$store.state.hotSearch
    }
  },
  methods:{
    onClickLeft(){  //点击返回
      this.$emit('onBack')
    },
    onSearch(){ //搜素
      if(this.keyword && !this.historySearchKey.includes(this.keyword)){
        this.historySearchKey.push(this.keyword)
        setStore('historySearch',this.historySearchKey,true)
      }
      this.$emit('onSearch',this.keyword)
    },
    setSearch(keyword){ //快捷搜索
      this.keyword = keyword
      this.$emit('onSearch',this.keyword)
    },
    removeHistorySearch(){  //删除最近搜索记录
      this.historySearchKey = []
      removeStore('historySearch')
    },
    focus(){  //点击搜索聚焦到输入框
      this.$nextTick(_=>{
        this.$refs.search.focus()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.search-wrap{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #fff;
  z-index: 9;
}
.search-item{
  padding: 10px 20px;
  .tag{
    position: relative;
    font-size: 14px;
    span{
      position: absolute;
      right: 0;
      top: 0;
      font-size: 16px;
    }
  }
  .item{
    padding-top: 4px;
    span{
      display: inline-block;
      margin: 6px 16px;
      font-size: 12px;
    }
    .act{
      color: @red;
    }
  }
}
</style>
