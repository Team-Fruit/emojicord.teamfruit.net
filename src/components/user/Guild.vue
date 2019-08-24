<template>
  <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>
  <v-container v-else grid-list-md>
    <v-row align="center" justify="space-around" class="px-4">
      <p class="white--text ma-0">Shows</p>
      <v-checkbox v-model="ready" label="Ready" color="success" class="mx-2" dark></v-checkbox>
      <v-checkbox v-model="invite" label="Bot Inviteable" color="warning" class="mx-2" dark></v-checkbox>
      <v-checkbox
        v-model="permission"
        label="Not Enough Permissions"
        color="error"
        class="mx-2"
        dark
      ></v-checkbox>
    </v-row>
    <transition-group name="flip-list" tag="div" class="layout row wrap">
      <v-flex
        xl3
        lg4
        md6
        sm12
        flexbox
        justify-end
        v-for="guild in filteredGuilds"
        :key="guild.id"
        class="list-item"
      >
        <GuildCard
          v-bind:id="guild.id"
          v-bind:name="guild.name"
          v-bind:icon="guild.icon"
          v-bind:isOwner="guild.owner"
          v-bind:botExists="guild.botexists"
          v-bind:canInvite="guild.caninvite"
        ></GuildCard>
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
      guilds: {},
      ready: true,
      invite: true,
      permission: true
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
  computed: {
    filteredGuilds() {
      return this.guilds.filter(
        guild =>
          (guild.botexists && this.ready) ||
          (guild.caninvite && this.invite && !guild.botexists) ||
          (!guild.caninvite && this.permission && !guild.botexists)
      );
    }
  },
  methods: {
    ...mapActions("http", ["get"])
  }
};
</script>

<style>
.list-item {
  transition: all 1s;
}

.flip-list-enter,
.flip-list-leave-to {
  opacity: 0;
  transition: transform 1s;
}

.flip-list-leave-active {
  opacity: 0;
  position: absolute;
}

/* .flip-list-move {
  transition: transform 1s;
} */
</style>

