<template>
  <div class="main-top">
    
    <nav-bar title="我的收藏" />

    <van-list
      v-model="loading"
      finished-text="没有更多了"
      :offset="60"
      :immediate-check="false"
      :finished="finished"
      @load="onLoad"
    >
      <collect-item
        v-for="item in collectList"
        :key="item.id"
        :cid="item.id"
        :collect="item.product"
        @onDelete="deleteCollect"
      />
    </van-list>
  
  </div>
</template>

<script>
import CollectItem from './CollectItem'
import { getCollection, deleteCollect } from 'api'
export default {
  name: 'collection',
  components: { CollectItem },
  data() {
    return {
      loading:false,
      finished: false,
      nextPage: true,
      page: 1,
      collectList: []
    }
  },
  created() {
    this.getCollection()
  },
  methods: {
    getCollection(){  // 获取收藏列表
      this.loading = true
      getCollection({page: this.page}).then(res=>{
        this.loading = false
        this.collectList.push(...res.data)
        if(res.data.length<12){
          this.nextPage = false
          this.finished = true
        }
      })
    },
    onLoad(){ // 加载更多
      if(this.nextPage){
        this.page++
        this.getCollection()
      }
    },
    deleteCollect(id){  // 取消收藏
      deleteCollect(id).then(res=>{
        const index = this.collectList.findIndex(item=>item.id == id)
        this.collectList.splice(index,1)
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
