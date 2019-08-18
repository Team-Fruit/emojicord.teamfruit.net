<template>
  <v-container v-if="loading" fill-height>
    <v-layout row wrap align-center>
      <v-progress-linear :indeterminate="true" class="fill-height" style="margin-bottom: 98px"></v-progress-linear>
    </v-layout>
  </v-container>
  <v-container v-else fill-height grid-list-md>
    <transition-group name="flip-list" tag="div" class="layout row wrap">
      <v-flex xl2 lg3 md4 sm6 xs6 flexbox justify-end v-for="guild in guilds" :key="guild.id">
        <GuildCard v-bind:id="guild.id" v-bind:name="guild.name" v-bind:icon="guild.icon"></GuildCard>
      </v-flex>
    </transition-group>
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
      loading: true,
      guilds: {}
    };
  },
  mounted() {
    this.get("/user/guilds")
      .then(res => {
        this.loading = false;
        this.guilds = res.data;
      })
      .catch(err => err);
  },
  methods: {
    ...mapActions("http", ["get"])
  }
};
</script>

<style>
.flip-list-enter-active,
.flip-list-leave-active {
  transition: opacity 1s;
}

.flip-list-enter,
.flip-list-leave-to {
  opacity: 0;
}

.flip-list-move {
  transition: transform 1s;
}
</style>

