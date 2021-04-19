<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  mounted(){
    this.scroll = new BScroll(this.$refs.wrapper, { click: true, tap: true })
  },
  methods:{
    refresh(){
      this.$nextTick(_=>{
        this.scroll.scrollTo(0,0,0)
        this.scroll.refresh()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper{
  height: 100%;
  overflow: hidden;
}
</style>
