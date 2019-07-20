<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xl2 lg3 md4 sm6 xs6 v-for="guild in guilds" :key="guild.id">
        <GuildCard v-bind:id="guild.id" v-bind:name="guild.name" v-bind:icon="guild.icon"></GuildCard>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import GuildCard from "@/components/user/GuildCard";

export default {
  components: {
    GuildCard
  },
  data() {
    return {
      guilds: {}
    };
  },
  mounted() {
    this.get("/user/guilds")
      .then(res => (this.guilds = res.data))
      .catch(err => err);
  },
  methods: {
    ...mapActions("http", ["get"])
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

