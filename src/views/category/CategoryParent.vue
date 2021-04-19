<template>
  <ul class="list">
    <li
      v-for="item in list"
      :key="item. id"
      @click="onChangeTab(item.id)"
      :class="{act:currentId==item.id}"
    >
      {{item.title}}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CategoryList',
  props:{
    currentId:{
      type:String,
      default:''
    },
    list:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    onChangeTab(id){
      this.$emit('update:currentId',id)
    }
  }
}
</script>

<style lang="less" scoped>
.list{
  li{
    height: 42px;
    line-height: 42px;
    font-size: 14px;
    text-align: center;
    &.act{
      color: @red;
    }
  }
}
</style>
