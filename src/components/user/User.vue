<template>
  <div>
    <Header></Header>
    <Alert></Alert>
    <v-content>
      <v-container>
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
