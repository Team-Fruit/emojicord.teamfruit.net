import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import auth from '@/store/modules/auth'
import alert from '@/store/modules/alert'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
      auth, alert
    },
    plugins: [createPersistedState({
      key: 'emojicord',
      storage: window.sessionStorage,
      paths: ['auth']
    })]
  })