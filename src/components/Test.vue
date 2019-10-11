<template>
  <v-container fill-height>
    <v-layout row wrap justify-center align-center>
      <v-form>
        <v-text-field v-model="port" label="Port" single-line dark></v-text-field>
        <v-btn color="success" @click="post()">POST</v-btn>
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      port: 36436
    };
  },
  methods: {
    ...mapActions("http", ["postLocalHost"]),
    post() {
      this.postLocalHost(this.port, { key: "sushi", token: "hisushi" });
    }
  }
};
</script>