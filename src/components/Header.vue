<template>
  <div class="root elevation-6">
    <v-container class="pa-0">
      <v-toolbar dark flat color="#202225" class="py-0 toolbar">
        <router-link :to="minecraft ? '/minecraft': '/'">
          <v-img :src="require('@/assets/header.svg')" contain height="38px" width="200px"></v-img>
        </router-link>
        <div class="ml-4"></div>
        <template v-if="minecraft">Minecraft Mode</template>
        <v-toolbar-items v-else class="hidden-sm-and-down">
          <!-- <v-btn text to="/">Home</v-btn> -->
          <v-btn text href="https://www.curseforge.com/minecraft/mc-mods/emojicord">Downloads</v-btn>
          <v-menu open-on-hover offset-y>
            <template v-slot:activator="{ on }">
              <v-btn text v-on="on">Integration</v-btn>
            </template>
            <v-list dark>
              <v-list-item to="/guild">
                <v-list-item-content>
                  <v-list-item-title>Guilds</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item to="/emoji">
                <v-list-item-content>
                  <v-list-item-title>Emojis</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-menu
          v-if="login"
          v-model="menu"
          bottom
          dark
          left
          offset-y
          transition="slide-y-transition"
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ on }">
            <v-img :src="avater" contain max-width="30px" v-on="on"></v-img>
          </template>
          <v-card color="#18191c" width="252px" height="52px" class="px-5 py-2">
            <v-container class="pa-0 ma-0">
              <v-layout row wrap>
                <v-flex xs9 d-flex>
                  <v-layout justify-center column>
                    <div class="as">Logged in as</div>
                    <div>
                      <span class="username">{{ user.username }}</span>
                      <span class="discriminator">#{{ user.discriminator }}</span>
                    </div>
                  </v-layout>
                </v-flex>
                <v-flex xs3 d-flex>
                  <v-layout align-center justify-center>
                    <div class="logout" @click="logout">Log Out</div>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-menu>
        <v-btn v-else rounded outlined dark href="https://api.emojicord.teamfruit.net/auth/login">
          <v-icon left small>fab fa-discord</v-icon>Login
        </v-btn>
      </v-toolbar>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      menu: false
    };
  },
  methods: {
    logout() {
      this.menu = false;
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters({
      avater: "auth/getAvaterURL",
      user: "auth/getUser",
      login: "auth/isLoggedin",
      minecraft: "minecraft/isConnected"
    })
  }
};
</script>

<style scoped>
.root {
  background-color: #202225;
}

.as {
  font-size: 12px;
  color: #b9bbbe;
  line-height: 16px;
  font-weight: 400;
}

.username {
  font-size: 16px;
  color: #f6f6f7;
  line-height: 20px;
  font-weight: 500;
}

.discriminator {
  font-size: 16px;
  color: #72767d;
  line-height: 20px;
  font-weight: 500;
}

.logout {
  font-size: 15px;
  color: #f04747;
}

:hover.logout {
  text-decoration: underline;
  cursor: pointer;
}
</style>
