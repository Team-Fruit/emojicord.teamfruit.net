<template>
  <div>
    <v-toolbar dark color="#202225" height="60px" class="py-0 toolbar">
      <v-img :src="require('@/assets/header.svg')" contain height="38px" max-width="200px"></v-img>
      <div class="ml-4"></div>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text>Guilds</v-btn>
        <v-btn text>Emojis</v-btn>
        <v-btn text>Downloads</v-btn>
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
      <v-btn
        v-else
        rounded
        outlined
        dark
        href="https://emojicord.teamfruit.net/api/auth/login"
      >Login</v-btn>
    </v-toolbar>
    <Alert></Alert>
  </div>
</template>

<script>
import Alert from "@/components/Alert";
import { mapGetters } from "vuex";

export default {
  components: {
    Alert
  },
  data: () => ({
    menu: false
  }),
  methods: {
    logout() {
      this.menu = false;
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters("auth", {
      avater: "getAvaterURL",
      user: "getUser",
      login: "isLoggedin"
    })
  }
};
</script>

<style>
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
