<template>
  <div>{{ guilds }}</div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      guilds: {}
    };
  },
  mounted() {
    this.get('/user/guilds')
      .then(res => (this.guilds = res.data))
      .catch(err => err)
  },
  methods: {
    ...mapActions('http', ['get'])
  }
};
</script>
