<template>
  <div class="main">
    
    <nav-bar title="收货地址" />
    
    <van-address-list
      v-model="addressId"
      :list="addressList"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @click-item="onClick"
    />

  </div>
</template>

<script>
import { getAddress } from 'api'
export default {
  name: 'addressList',
  data() {
    return {
      addressId: '',
      addressList: []
    }
  },
  created(){
    this.init()
  },
  methods:{
    init(){
      this.getAddress()
    },
    getAddress(){ // 地址列表
      getAddress().then(res=>{
        this.addressList =  res.data.map(item=>(
          {
            id: item.id,
            name: item.realname,
            tel: item.mobile,
            address: `${item.address_name} ${item.address_details}`,
            isDefault: item.is_default == 1
          }
        ))
      })
    },
    onAdd(){  // 点击添加按钮
      this.$router.push('/addressEdit')
    },
    onEdit(data){ // 点击编辑icon
      this.$router.push(`/addressEdit?id=${data.id}`)
    },
    onClick(data){  // 点击选中
      const { type, ids, num } = this.$store.state.orderPreview
      console.log( this.$store.state.orderPreview);
      if(!ids) return 
      const address = {
        id: data.id,
        realname: data.name,
        mobile: data.tel,
        address: data.address
      }
      this.$store.commit('setOrderPreview',{type,ids,address})
      this.$router.push({
        path:'/orderCreate',
        query:{ type, ids, num, source:data.id, }
      })
    }
  }
}
</script>

<style lang="less" scoped>
::v-deep .van-tag--round{
  border-radius: 4px;
}
</style>
