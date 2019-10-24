<template>
  <v-container fill-height>
    <v-layout row wrap justify-center align-center>
      <v-btn v-if="isFetched" color="success" @click="onPost()">Save</v-btn>
      <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  mounted() {
    if (!this.isFetched) this.fetch();
  },
  computed: {
    ...mapGetters("emoji", ["isFetched", "getEmojisForMC"]),
    ...mapGetters("auth", ["getUser"]),
    ...mapGetters("minecraft", ["getPort", "getKey"])
  },
  methods: {
    ...mapActions("http", ["postLocalHost"]),
    ...mapActions("emoji", ["fetch"]),
    onPost() {
      this.postLocalHost({
        port: this.getPort,
        key: this.getKey,
        data: this.getEmojisForMC
      });
    }
  }
};
</script>