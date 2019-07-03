<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isLoggedin: 'auth/isLoggedin'
    })
  }
}
</script>


<style>
  #app {
    background-color: #2C2F33;
    color: #99AAB5;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #FFFFFF;
  }
</style>

