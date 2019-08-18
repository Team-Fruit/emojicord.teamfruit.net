<template>
  <div>
    <Header></Header>
    <!-- <v-content class="fill-height"> -->
      <Alert></Alert>
      <router-view></router-view>
    <!-- </v-content> -->
  </div>
</template>

<script>
import Header from "@/components/Header";
import Alert from "@/components/Alert";

export default {
  components: {
    Header,
    Alert
  }
};
</script>
