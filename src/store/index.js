import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import auth from '@/store/modules/auth'
import http from '@/store/modules/http'
import minecraft from '@/store/modules/minecraft'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth, http, minecraft
  },
  plugins: [createPersistedState({
    key: 'emojicord.teamfruit.net',
    // storage: window.sessionStorage,
    paths: ['auth', 'minecraft']
  })]
})