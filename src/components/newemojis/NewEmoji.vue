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
        <v-card class="pa-2" outlined tile flat :height="contentHeight" color="#23272A">
          <v-list dark color="#23272A" class="overflow-y-auto">
            <EmojiGuildItem
              :guilds="getGuilds"
              :expand="availableGroupExpand"
              title="Available"
              :ready="true"
              @select="jumpGuild"
            ></EmojiGuildItem>
            <EmojiGuildItem
              :guilds="getInviteableGuilds"
              :expand="true"
              title="Bot Inviteable"
              :permission="true"
            ></EmojiGuildItem>
            <EmojiGuildItem :guilds="getNotInviteableGuilds" title="No Permission"></EmojiGuildItem>
            <v-list-item v-if="!guilds&&isFetched" class="green" @click="fetchGuilds()">
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
        <v-card
          dark
          tile
          flat
          color="#2C2F33"
          :height="contentHeight"
          class="overflow-y-auto"
          id="emoji-box"
        >
          <template v-if="!search">
            <v-card
              dark
              tile
              color="#2C2F33"
              v-for="guild in getGuilds"
              :key="guild.id"
              :id="`guild-${guild.id}`"
            >
              <v-banner dark tile sticky color="#2C2F33">
                <v-avatar>
                  <v-img
                    v-if="guild.icon"
                    :src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}?size=64`"
                  ></v-img>
                </v-avatar>
                {{ guild.name }}
              </v-banner>
              <EmojiContainer :emojis="getEmojisByGuildID(guild.id)" ></EmojiContainer>
            </v-card>
          </template>
          <v-card v-else dark tile elevation="0" color="#2C2F33">
            <EmojiContainer :emojis="getFilteredEmojis"></EmojiContainer>
          </v-card>
        </v-card>
      </v-col>
      <v-col lg="2">
        <v-card
          dark
          class="pa-2 d-flex flex-column"
          outlined
          tile
          flat
          color="#2f3136"
          :height="contentHeight"
        >
          <v-card dark outlined tile color="#2f3136">
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              dark
              single-line
              hide-details
              clearable
              class="ml-2"
            ></v-text-field>
          </v-card>
          <v-card v-if="isFetched" dark class="mt-auto" outlined tile color="#2f3136">
            <span v-if="!isConnected" class>Open from Minecraft to Save</span>
            <v-btn block color="warning" :disabled="!isConnected">Save</v-btn>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EmojiGuildItem from "@/components/newemojis/EmojiGuildItem";
import EmojiContainer from "@/components/newemojis/EmojiContainer";

export default {
  components: {
    EmojiGuildItem,
    EmojiContainer
  },
  data() {
    return {
      contentHeight: 0,
      load: {
        guild: false
      },
      availableGroupExpand: true,
      guilds: null,
      search: ""
    };
  },
  mounted() {
    this.onResize();
    this.fetch();
  },
  computed: {
    ...mapGetters({
      isFetched: "emoji/isFetched",
      getGuilds: "emoji/getGuilds",
      getEmojis: "emoji/getEmojis",
      getEmojisByGuildID: "emoji/getEmojisByGuildID",
      getUser: "emoji/getUser",
      isConnected: "minecraft/isConnected"
    }),
    getFilteredEmojis() {
      return this.getEmojis.emojis.filter(emoji =>
        emoji.name.toLowerCase().includes(this.search)
      );
    },
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
    },
    jumpGuild(id) {
      if (this.search) {
        this.search = "";
        this.$nextTick(() => {
          this.$vuetify.goTo(`#guild-${id}`, { container: "#emoji-box" });
        });
      } else this.$vuetify.goTo(`#guild-${id}`, { container: "#emoji-box" });
    }
  }
};
</script>

<style scoped>
.text {
  color: #dcddde;
}
</style>