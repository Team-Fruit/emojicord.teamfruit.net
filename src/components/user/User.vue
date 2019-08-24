<template>
  <div>
    <Header></Header>
    <!-- <v-content class="fill-height"> -->
      <Alert></Alert>
      <!-- <v-contianer fill-height> -->
      <router-view></router-view>
      <!-- </v-contianer> -->
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
