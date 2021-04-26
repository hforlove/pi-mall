import Vue from "vue";
import Vuex from "vuex";

import { setStore, getStore } from 'utils'

Vue.use(Vuex);

import { getCartNum } from 'api'

const hotSearch = getStore('hotSearch',true) || []
const userInfo = getStore('userInfo',true) || {}

const state = {
  loading: false,
  hotSearch,
  userInfo,
  cartNum: 0,
  orderPreview: {}
}

export default new Vuex.Store({
  state,
  getters:{
    cartNum: state=> parseInt(state.userInfo.cart_num)
  },
  mutations: {
    initHotSearch(state,data){
      setStore('hotSearch',data,true)
      state.hotSearch = data
    },
    setUserInfo(state,data){
      setStore('userInfo',data,true)
      state.userInfo = data
    },
    setCartNum(state,data){
      state.userInfo.cart_num = data
      setStore('userInfo',state.userInfo,true)
    },
    setOrderPreview(state,data){
      state.orderPreview = data
    },
    setLoading(state,data){
      state.loading = data
    }
  },
  actions:{
    getCartNum({commit}){
      getCartNum().then(res=>{
        commit('setCartNum',res.data)
      })
    }
  }
});
