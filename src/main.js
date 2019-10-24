import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from '@/router'
import store from '@/store'
import VueRouter from 'vue-router'
import VueClipboard from 'vue-clipboard2'
import Notifications from 'vue-notification'
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueClipboard)
Vue.use(Notifications)
Vue.use(VueAnalytics, {
  id: 'UA-150873600-1',
  router
})

new Vue({
  vuetify,
  render: h => h(App),
  router,
  store
}).$mount('#app')