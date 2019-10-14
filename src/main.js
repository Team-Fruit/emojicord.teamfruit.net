import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from '@/router'
import store from '@/store'
import VueRouter from 'vue-router'
import VueClipboard from 'vue-clipboard2'
import Notifications from 'vue-notification'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueClipboard)
Vue.use(Notifications)

new Vue({
  vuetify,
  render: h => h(App),
  router,
  store
}).$mount('#app')