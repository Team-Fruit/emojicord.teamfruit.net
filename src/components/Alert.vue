<template>
  <v-alert :value="exits" :type="type" dark>{{ message }}</v-alert>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState("alert", {
      message: "message",
      type: "type"
    }),
    ...mapGetters("alert", {
      exits: "exits"
    })
  }
};
</script>
