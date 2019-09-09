<template>
  <div>
    <Header></Header>
    <!-- <v-content class="fill-height"> -->
      <!-- <v-contianer fill-height> -->
      <router-view></router-view>
      <!-- </v-contianer> -->
    <!-- </v-content> -->
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  components: {
    Header,
  }
};
</script>
