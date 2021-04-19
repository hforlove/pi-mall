import Vue from "vue";
import Vuex from "vuex";

import { setStore, getStore } from 'utils'

Vue.use(Vuex);

const hotSearch = getStore('hotSearch',true) || []

const state = {
  hotSearch,
}

export default new Vuex.Store({
  state,
  mutations: {
    initHotSearch(state,data){
      setStore('hotSearch',data,true)
      state.hotSearch = data
    }
  },
  actions: {},
});
