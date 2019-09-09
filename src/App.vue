<template>
  <v-app>
    <Header></Header>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Header from "@/components/Header";
import { mapGetters } from "vuex";

export default {
  components: {
    Header
  },
  computed: {
    ...mapGetters("auth", {
      isLoggedin: "isLoggedin"
    })
  }
};
</script>


<style>
#app {
  background-color: #2c2f33;
  color: #99aab5;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  color: #ffffff;
}
</style>

