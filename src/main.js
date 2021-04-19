import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import rules from './utils/rules'

import 'normalize.css/normalize.css'
import 'asset/styles/common.less'
import 'amfe-flexible'

import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

Vue.prototype.rules=rules

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
