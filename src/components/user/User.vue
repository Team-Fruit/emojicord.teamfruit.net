<template>
  <div>
    <Header></Header>
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  components: {
    Header
  }
};
</script>
