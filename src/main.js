import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import './plugins/vuetify'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
