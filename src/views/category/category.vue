<template>
    <div class="main">
      
      <nav-bar title="分类">
        <template #right>
          <van-icon @click="$router.push('/goods')" name="search" size="18" />
        </template>
      </nav-bar>

      <div class="category">
        <div class="cate-left">
          <scroll ref="parentScroll">
            <category-parent
              :current-id.sync="currentId"
              :list="parentList"
            />
          </scroll>
        </div>
        <div class="cate-right">
          <scroll ref="childScroll">
            <div>
              <category-child
                v-for="item in childList"
                :key="item.id"
                :data="item"
              />
            </div>
          </scroll>
        </div>
      </div>
    </div>
</template>

<script>
import Scroll from 'comp/Scroll'
import CategoryParent from './CategoryParent'
import CategoryChild from './CategoryChild'

import { getCategory } from 'api'

export default {
  name: 'category',
  components: { Scroll, CategoryParent, CategoryChild },
  data() {
    return {
      parentList:[],
      currentId:''
    }
  },
  computed:{
    childList(){
      const child = this.parentList.find(item=>item.id==this.currentId)
      return child?child.child:[]
    }
  },
  created(){
    getCategory().then(res=>{
      this.parentList = res.data
      this.currentId = res.data[0].id
      this.$refs.parentScroll.refresh()
    })
  },
  watch:{
    childList(){
      this.$refs.childScroll.refresh()
    }
  }
}
</script>

<style lang="less" scoped>
.category{
  display: flex;
  height: calc(100vh - @barH - @bottomH);
}
.cate-left{
  height: 100%;
  width: 86px;
  overflow: hidden;
}
.cate-right{
  height: 100%;
  flex: 1;
  overflow: hidden;
}
</style>
