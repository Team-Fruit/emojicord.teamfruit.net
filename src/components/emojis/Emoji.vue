<template>
  <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>
  <v-container v-else>{{this.emojis}}</v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      loading: true,
      emojis: {}
    };
  },
  mounted() {
    this.get("/user/emojis")
      .then(res => {
        this.loading = false;
        this.emojis = res.data;
      })
      .catch(err => err);
  },
  methods: {
    ...mapActions("http", ["get"])
  }
};
</script>