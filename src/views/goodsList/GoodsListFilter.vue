<template>
  <van-popup
    class="filter-cont"
    v-model="value" 
    position="right"
    :close-on-click-overlay="false"
  >
    <ul class="filter-inner">
      <li>
        <div class="bar">价格区间</div>
        <div class="price">
          <van-field v-model="min_price" type="digit" input-align="center" placeholder="最低价" />
          <span class="">-</span>
          <van-field v-model="max_price" type="digit" input-align="center" placeholder="最高价" />
        </div>
      </li>
      <li>
        <div class="bar">分类</div>
        <div class="cont">
          <span
            v-for="item in cateList"
            :key="item.id"
            :class="{act:item.selected}"
            @click="item.selected=!item.selected"
          >
            {{item.title}}
          </span>
        </div>
      </li>
      <li>
        <div class="bar">品牌</div>
        <div class="cont">
          <span
            v-for="item in brandList"
            :key="item.id"
            :class="{act:item.selected}"
            @click="item.selected=!item.selected"
          >
            {{item.title}}
          </span>
        </div>
      </li>
    </ul>
    <div class="filter-btn">
      <van-button class="btn" size="small" @click="resetForm">重置</van-button>
      <van-button class="btn" size="small" type="danger" @click="onSubmit">确定</van-button>
    </div>
  </van-popup>
</template>

<script>
import { getCategory, getBrand } from 'api'
export default {
  name: '',
  props:{
    value:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      min_price:'',
      max_price:'',
      cateList:[],
      brandList:[],
    }
  },
  created(){
    this.initData()
  },
  methods:{
    initData(){ // 初始数据
      getCategory().then(res=>{
        res.data.map(item=>item.selected = false)
        this.cateList =  res.data
      })
      getBrand().then(res=>{
        res.data.map(item=>item.selected = false)
        this.brandList =  res.data
      })
    },
    resetForm(){  // 重置
      this.min_price=''
      this.max_price=''
      this.cateList.map(item=>item.selected = false)
      this.brandList.map(item=>item.selected = false)
    },
    onSubmit(){ // 确定筛选
      const params = {}
      const cates = this.cateList.filter(item=>item.selected).map(item=>item.id)
      const brands = this.brandList.filter(item=>item.selected).map(item=>item.id)
      this.min_price && (params.min_price = this.min_price)
      this.max_price && (params.max_price = this.max_price)

      cates.length && (params.cate_id = cates.join(','))
      brands.length && (params.brand_id = brands.join(','))
      
      this.$emit('input',false)
      this.$emit('filter',params)

    }
  }
}
</script>

<style lang="less" scoped>
.filter-cont{
  height: 100vh;
  background: #fff;
  width: 90%;
  display: flex;
  padding: 40px 10px;
  flex-direction: column;
  justify-content: space-between;
}
.filter-btn{
  display: flex;
  justify-content: center;
  .btn{
    width: 120px;
  }
}
.filter-inner{
  font-size: 16px;
  >li{
    padding: 20px 0;
  }
  .bar{
    font-weight: bold;
  }
  .price{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-top: 20px;
  }
  .cont{
    display: flex;
    flex-wrap: wrap;
    >div{
      text-align: center;
      flex: 2;
    }
    >.m{
      flex: 1;
      line-height: 44px;
    }
    >span{
      position: relative;
      overflow: hidden;
      margin: 10px;
      padding: 4px 10px 4px 0;
      font-size: 14px;
      border-radius: 2px;
    }
    >.act{
      color: @red;
      &::after{    content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        width: 12px;
        height: 12px;
        background: url('~asset/images/selected.png') no-repeat;
        background-size: 12px auto;
        overflow: hidden;
        z-index: 1;
      }
    }
  }
}
</style>
