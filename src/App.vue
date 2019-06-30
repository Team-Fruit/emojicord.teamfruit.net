<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Home from './components/Home'

export default {
  name: 'App',
  components: {
    Home
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style>
  #app {
    background-color: #2C2F33;
  }
</style>

