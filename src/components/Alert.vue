<template>
  <v-alert
    :value="exits"
    :type="type"
    dark
    dismissible
    class="alert"
    @input="destroy()"
    fixed
  >{{ message }}</v-alert>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("alert", {
      message: "message",
      type: "type"
    }),
    ...mapGetters("alert", {
      exits: "exits"
    })
  },
  methods: {
    ...mapActions("alert", ["destroy"]),
  }
};
</script>

<style scoped>
.alert {
  border-radius: 0;
  margin-bottom: 0;
}
</style>
