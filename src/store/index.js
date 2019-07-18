import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import auth from '@/store/modules/auth'
import http from '@/store/modules/http'
import alert from '@/store/modules/alert'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
      auth, http, alert
    },
    plugins: [createPersistedState({
      key: 'emojicord',
      storage: window.sessionStorage,
      paths: ['auth']
    })]
  })