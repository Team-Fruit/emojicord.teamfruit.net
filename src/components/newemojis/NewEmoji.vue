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
            <v-list-item dark link v-for="guild in getGuilds" :key="guild.id">
              <v-list-item-avatar>
                <v-img
                  v-if="guild.icon"
                  :src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}?size=64`"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{guild.name}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col lg="8">
        <v-card class="pa-2" outlined tile color="#2C2F33" height="100%">Main</v-card>
      </v-col>
      <v-col lg="2">
        <v-card class="pa-2" outlined tile color="#2f3136" height="100%">Search</v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      contentHeight: 0
    };
  },
  mounted() {
    this.onResize();
    this.fetch();
  },
  computed: {
    ...mapGetters("emoji", ["isFetched", "getEmojis", "getGuilds", "getUser"])
  },
  methods: {
    ...mapActions("emoji", ["fetch"]),
    onResize() {
      this.contentHeight = window.innerHeight - 170;
    }
  }
};
</script>

<style scoped>
.text {
  color: #dcddde;
}
</style>