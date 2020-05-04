<template>
  <v-container color="#2f3136" v-resize="onResize">
    <v-row no-gutters>
      <v-col align-self="end">
        <h1 class="display-1 font-weight-bold mb-4">Discord Integration</h1>
      </v-col>
      <v-spacer></v-spacer>
      <v-banner class="title font-weight-regular text" color="#2f3136">
        Legacy UI
        <template v-slot:actions>
          <v-btn depressed color="success" to="/guild">Guilds</v-btn>
          <v-btn depressed color="success" to="/emoji">Emojis</v-btn>
        </template>
      </v-banner>
    </v-row>
    <v-row no-gutters justify="end">
      <v-col lg="2">
        <v-card class="pa-2" outlined tile color="#23272A">
          <v-list dark color="#23272A" :height="contentHeight" class="overflow-y-auto">
            <EmojiGuildItem :guilds="getGuilds" :expand="availableGroupExpand" title="Available"></EmojiGuildItem>
            <EmojiGuildItem
              :guilds="getInviteableGuilds"
              :expand="true"
              title="Bot Inviteable"
              :permission="true"
            ></EmojiGuildItem>
            <EmojiGuildItem :guilds="getNotInviteableGuilds" title="No Permission"></EmojiGuildItem>
            <v-list-item v-if="!guilds" class="green" @click="fetchGuilds()">
              <v-list-item-avatar>
                <v-progress-circular v-if="load.guild" indeterminate color="white"></v-progress-circular>
                <v-icon v-else>fas fa-plus</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Add Guild</v-list-item-title>
                <v-list-item-subtitle>Bot invitation required</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col lg="8">
        <v-card dark tile color="#2C2F33" :height="contentHeight" class="overflow-y-auto">
          <v-card dark tile color="#2C2F33" v-for="guild in getGuilds" :key="guild.id">
            <v-banner dark tile sticky color="#2C2F33">
              <v-avatar>
                <v-img
                  v-if="guild.icon"
                  :src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}?size=64`"
                ></v-img>
              </v-avatar>
              {{ guild.name }}
            </v-banner>
            <v-container>
              <v-row class="px-3" justify="start">
                <v-avatar
                  v-for="emoji in getEmojisByGuildID(guild.id)"
                  :key="emoji.id"
                  class="ma-1"
                  tile
                >
                  <v-img :src="`https://cdn.discordapp.com/emojis/${emoji.id}`"></v-img>
                </v-avatar>
              </v-row>
            </v-container>
          </v-card>
        </v-card>
      </v-col>
      <v-col lg="2">
        <v-card class="pa-2" outlined tile color="#2f3136" height="100%">Search</v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EmojiGuildItem from "@/components/newemojis/EmojiGuildItem";

export default {
  components: {
    EmojiGuildItem
  },
  data() {
    return {
      contentHeight: 0,
      load: {
        emoji: true,
        guild: false
      },
      availableGroupExpand: true,
      guilds: null
    };
  },
  mounted() {
    this.onResize();
    this.fetch();
  },
  computed: {
    ...mapGetters("emoji", [
      "isFetched",
      "getGuilds",
      "getEmojisByGuildID",
      "getUser"
    ]),
    getInviteableGuilds() {
      if (!this.guilds) return null;
      return this.guilds.filter(guild => guild.caninvite && !guild.botexists);
    },
    getNotInviteableGuilds() {
      if (!this.guilds) return null;
      return this.guilds.filter(guild => !guild.caninvite && !guild.botexists);
    }
  },
  methods: {
    ...mapActions("emoji", ["fetch"]),
    ...mapActions("http", ["get"]),
    onResize() {
      this.contentHeight = window.innerHeight - 170;
    },
    fetchGuilds() {
      this.load.guild = true;
      this.get("/user/guilds")
        .then(res => {
          this.guilds = res.data;
          this.load.guild = false;
          this.availableGroupExpand = false;
        })
        .catch(err => err);
    }
  }
};
</script>

<style scoped>
.text {
  color: #dcddde;
}
</style>