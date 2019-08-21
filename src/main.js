import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from '@/router'
import store from '@/store'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
  vuetify,
  render: h => h(App),
  router,
  store
}).$mount('#app')