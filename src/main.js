import Vue from 'vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import constants from '@/constants.js';

import 'material-design-icons-iconfont/dist/material-design-icons.css'

import App from './App.vue'

window.onbeforeunload = () => {
  return "This page has no cookies and your data will be lost. Leave anyway?"
}

Vue.config.productionTip = false
Vue.prototype.$constants = constants;
new Vue({
  router,
  store,
  vuetify,
  // constants,
  render: h => h(App)
}).$mount('#app')
