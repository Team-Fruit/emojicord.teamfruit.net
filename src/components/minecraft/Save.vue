<template>
  <v-container fill-height>
    <v-layout row wrap justify-center align-center>
      <v-icon v-if="!isConnected" dark>fas fa-check</v-icon>
      <v-btn v-else-if="isFetched" color="success" @click="onPost()">Save</v-btn>
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
    ...mapGetters("minecraft", ["getPort", "getKey", "isConnected"])
  },
  methods: {
    ...mapActions("http", ["postLocalHost"]),
    ...mapActions("emoji", ["fetch"]),
    ...mapActions("minecraft", ["disconnect"]),
    onPost() {
      this.postLocalHost({
        port: this.getPort,
        key: this.getKey,
        data: this.getEmojisForMC
      }).then(res => {
        if (res.status === 204) this.disconnect();
      });
    }
  }
};
</script>