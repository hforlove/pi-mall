<template>
  <ul class="home_Nav">
    <li
      v-for="item in list"
      :key="item.id"
      @click="$router.push(`/goods?cate=${item.id}`)"
    >
      <div>
        <img :src="item.cover" />
        {{item.title}}
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'HomeNav',
  props:{
    list:{
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home_Nav{
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0;
  li{
    width: 20%;
    padding: 10px;
  }
  div{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    img{
      width: 52px;
      height: 52px;
      border-radius: 4px;
    }
  }
}
</style>
