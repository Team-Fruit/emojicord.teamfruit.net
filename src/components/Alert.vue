<template>
  <v-alert :value="exits" :type="type" dark dismissible class="alert">{{ message }}</v-alert>
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

<style scoped>
.alert {
  border-radius: 0;
  margin-bottom: 0;
}
</style>
