<template>
  <div class="detail-info">
    <div class="title">
      <div>{{info.name}}</div>
      <span @click="onCollect" :class="{act: info.myCollect}">
        <van-icon size="18" :name="`star${info.myCollect?'':'-o'}`" />
        收藏
      </span>
    </div>
    <div class="tips">
      <div>
        <span>￥{{info.price}}</span>
        <span>￥{{info.market_price}}</span>
      </div>
      <span>月销：{{info.total_sales }}</span>
    </div>
    <div class="cell">
      <van-cell @click="showSku=true" title="选择" is-link value="商品规格" />
    </div>
    <div class="cell">
      <van-cell title="优惠券" is-link value="领取优惠券" />
    </div>
    <div class="cell" v-if="tags.length">
      <van-cell @click="popupTag=true" title="服务" is-link :value="tags[0]" />
    </div>
    <div class="cell" v-if="attrs.length">
      <van-cell @click="popupAttr=true" title="参数" is-link :value="attrs[0].value" />
    </div>

    <div class="cell cell-score" :style="{'padding-top':'0.4rem'}">
      <van-cell title="评价" is-link :value="`好评率 ${info.match_ratio }%`" />
    </div>

    <van-sku
      v-model="showSku"
      :sku="sku"
      :goods="{picture:info.picture}"
      :goods-id="info.id"
      @add-cart="addCart"
      @buy-clicked="buyNow"
    />

    <van-popup
      v-if="attrs.length"
      class="popup"
      v-model="popupAttr"
      position="bottom"
    >
      <p
        v-for="item in attrs"
        :key="item.id"
      >
        <span>{{item.title}}:</span>
        <span>{{item.value}}:</span>
      </p>
    </van-popup>

    <van-popup
      v-if="tags.length"
      class="popup"
      v-model="popupTag"
      position="bottom"
    >
      <p
        v-for="item in info.tags"
        :key="item"
      >
        <span>{{item}}</span>
      </p>
    </van-popup>
    
  </div>
</template>

<script>
export default {
  name: 'GoodsDetailInfo',
  props:{
    info:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
      showSku: false,
      popupAttr: false,
      popupTag: false
    }
  },
  computed:{
    attrs(){
      return this.info?.attributeValue?.length ? this.info.attributeValue : []
    },
    tags(){
      return this.info?.tags?.length ? this.info.tags : []
    },
    sku(){
      const attrs = {}
      const sku = {
        tree: [],
        list: [],
        price: this.info.price||'',
        stock_num: parseInt(this.info.stock || 0)
      }

      const tree = []
      if(this.info?.base_attribute_format?.length){
        this.info.base_attribute_format.forEach(item=>{
          const child = []
          item.value.forEach(value=>{
            child.push({
              id: value.base_spec_value_id,
              name: value.title
            })
            attrs[value.base_spec_value_id] = value.base_spec_id
          })
          tree.push({
            k_s: item.base_spec_id,
            k: item.title,
            v: child
          })
        })
      }
      
      const list = []
      if(this.info?.sku?.length){
        this.info.sku.forEach(item=>{
          const temp = {}
          item.data.split('-').forEach(item=>{
            temp[attrs[item]] = item
          })
          list.push({
            id: item.id,
            price: item.price*100,
            stock_num: item.stock*1,
            ...temp
          })
        })
      }
      sku.tree = tree
      sku.list = list
      
      return sku
    }
  },
  methods:{
    show(){
      this.showSku = true
    },
    addCart(data){
      this.showSku = false
      this.$emit('addCart',data)
    },
    buyNow(data){
      this.showSku = false
      this.$emit('buyNow',data)
    },
    onCollect(){
      this.$emit('onCollect')
    }
  }
}
</script>

<style lang="less" scoped>
.detail-info{
  padding: 16px;
  font-size: 14px;
  .title{
    display: flex;
    align-items: center;
    >div{
      flex: 1;
      padding-right: 10px;
      line-height: 18px;
      font-weight: bold;
    }
    >span{
      width: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 12px;
      color: @gray;
    }
    .act{
      color: @red;
    }
  }
  .tips{
    display: flex;
    padding: 10px 0;
    justify-content: space-between;
    >div{
      font-size: 16px;
      span:first-child{
        color: @red;
      }
      span:last-child{
        font-size: 12px;
        color: @gray;
        text-decoration: line-through;
      }
    }
    >span{
      font-size: 12px;
      color: @gray;
    }
  }
  .cell{
    ::v-deep{
      .van-cell{
        padding-left: 0;
        padding-right: 0;
      }
      .van-cell__title{
        width: 80px;
        flex: none;
        color: @black;
      }
      .van-cell__value{
        text-align: left;
        color: @gray;
      }
    }
  }
  .cell-score{
    ::v-deep{
      .van-cell__title{
        font-size: 15px;
      }
      .van-cell__value{
        text-align: right;
        color: @gray;
      }
    }
  }
  .info{
    display: flex;
    padding: 10px 0;
    >span{
      width: 80px;
    }
    >div{
      flex: 1;
    }
  }
}
.popup{
  padding: 20px;
  >p{
    padding: 10px 0;
    color: @gray;
    font-size: 14px;
    >span{
      margin-right: 16px;
    }
  }
}
</style>
