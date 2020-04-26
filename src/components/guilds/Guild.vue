<template>
  <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>
  <v-container v-else grid-list-md>
    <v-container class="mx-8 mt-6">
        <h1 class="display-1 font-weight-bold mb-4">Guilds</h1>
        <p class="title font-weight-regular">Invite a bot to import emoji into Emojicord!</p>
    </v-container>
    <v-row align="center" justify="space-around" class="px-4">
      <p class="white--text ma-0">Filter</p>
      <v-checkbox v-model="ready" label="Ready to Use" color="success" class="mx-2" dark></v-checkbox>
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
        xs12
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
import GuildCard from "@/components/guilds/GuildCard";

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
      return this.guilds
        .filter(
          guild =>
            (guild.botexists && this.ready) ||
            (guild.caninvite && this.invite && !guild.botexists) ||
            (!guild.caninvite && this.permission && !guild.botexists)
        )
        .sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        })
        .sort((a, b) => {
          if (a.botexists && !b.botexists) return -1;
          if (!a.botexists && b.botexists) return 1;
          if (a.caninvite && !b.caninvite) return -1;
          if (!a.caninvite && b.caninvite) return 1;
          return 0;
        });
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

