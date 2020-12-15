import Vue from 'vue'
import Vuex from 'vuex'
import noncheckout from './modules/noncheckout.js';
import checkout from './modules/checkout.js';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    noncheckout,
    checkout
  }
})
