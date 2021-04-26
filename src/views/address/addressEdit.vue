<template>
  <div class="main">
    
    <nav-bar :title="title" />

    <van-address-edit
      :area-list="areaList"
      :address-info="address"
      :show-delete="!!id"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />

  </div>
</template>

<script>
import { areaList } from '@vant/area-data'
import { createAddress, updateAddress, deleteAddress, getAddressDetail } from 'api'

const { province_list, city_list, county_list} = areaList

export default {
  name: 'addressEdit',
  data() {
    return {
      id:'',
      title:'新增地址',
      areaList,
      address:{
        // tel:13128542661,
        // name:'pride',
        // addressDetail:'白蕉镇红卫村48号'
      },
      searchResult: []
    }
  },
  created(){
    this.id = this.$route.query.id
    if(this.id){
      this.title = '编辑地址'
      this.getAddressDetail()
    }
  },
  methods:{
    getAddressDetail(){ //获取地址详情
      getAddressDetail(this.id).then(res=>{
        const data = res.data
        const { province,city,county } = this.getAddressValue(data)
        this.address = {
          tel: data.mobile,
          name: data.realname,
          addressDetail: data.address_details,
          isDefault: !!data.is_default,
          province,
          city,
          county,
          areaCode: data.area_id+''
        }
      })
    },
    onSave(data){ //保存
      const { province,city,county } = this.getAddressCode(data)
      const params = {
          mobile: data.tel,
          realname: data.name,
          address_details: data.addressDetail,
          province_id: province,
          city_id: city,
          area_id: county,
          is_default: data.isDefault*1
      }
      if(this.id){
        params.id = this.id
        updateAddress(params).then(res=>{
          this.$router.push('/address')
        })
      }else{
        createAddress(params).then(res=>{
          this.$router.push('/address')
        })
      }
    },
    onDelete(){ //删除地址
      deleteAddress(this.id).then(res=>{
        this.$router.push('/address')
      })
    },
    getAddressValue(data){  //获取对应的地点值
      return {
        province: province_list[data.province_id],
        city: city_list[data.city_id],
        county: county_list[data.area_id]
      }
    },
    getAddressCode(data){ // 获取对应的地点code
      let province,city,county
      
      for(let attr in province_list){
        if(province_list[attr]==data.province){
          province = attr
          break
        }
      }
      for(let attr in city_list){
        if(city_list[attr]==data.city){
          city = attr
          break
        }
      }
      for(let attr in county_list){
        if(county_list[attr]==data.county){
          county = attr
          break
        }
      }
      return { province,city,county }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
