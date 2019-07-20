<template>
  <div>
    <Header></Header>
    <v-content>
      <v-container>
        <Alert></Alert>
        <router-view></router-view>
      </v-container>
    </v-content>
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
