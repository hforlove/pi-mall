<template>
  <div>
    <van-row :class="`sort-wrap sort-wrap${sortType}`">
      <van-col span="6">
        <van-dropdown-menu>
          <van-dropdown-item
            v-model="selectType"
            :options="select"
            @close="change"
          />
        </van-dropdown-menu>
      </van-col>
      <van-col span="6">
        <div class="tag tag2" @click="sort(2)">销量</div>
      </van-col>
      <van-col span="6">
        <div class="tag tag3" @click="sort(3)">最热</div>
      </van-col>
      <van-col span="6">
        <div class="tag tag4" @click="showFilter">筛选</div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'GoodsListFilter',
  data() {
    return {
      isActive: true,
      sortType: 1,
      selectType: 1,
      select: [
        { text: '综合', value: 1 },
        { text: '价格升序', value: 2 },
        { text: '价格降序', value: 3 },
      ]
    }
  },
  methods: {
    sort(type){ //点击排序
      if(this.sortType == type) return
      const params = {}
      this.sortType = type
      type==2 && (params.total_sales = 'desc')
      type==3 && (params.view = 'desc')
      this.$emit('sort',params)
    },
    change(){ //选择后排序
      let params = {}
      switch(this.selectType){
        case 1:
          params = {}
          break
        case 2:
          params.price = 'asc'
          break
        case 3:
          params.price = 'desc'
          break
      }
      this.sortType = 1
      this.$emit('sort',params)
    },
    showFilter(){
      this.$emit('showFilter')
    },
    reset(){
      this.sortType = 4
    }
  }
}
</script>

<style lang="less" scoped>
.sort-wrap{
  .tag{
    height: 48px;
    line-height: 48px;
    font-size: 14px;
    text-align: center;
  }
  ::v-deep .van-dropdown-menu__title{
    &::after{
      border-color:transparent transparent @gray @gray;
    }
  }
}
.sort-wrap1{
  ::v-deep .van-dropdown-menu__title{
    color: @red;
    &::after{
      border-color:transparent transparent @red @red;
    }
  }
}
.sort-wrap2 .tag2{
  color: @red;
}
.sort-wrap3 .tag3{
  color: @red;
}
.sort-wrap4 .tag4{
  color: @red;
}
</style>
