<template>
  <v-container grid-list-xl>
    <v-layout justify-center>
      <v-flex lg10 md11 xs12>
        <v-row>
          <v-col>
            <div class="block elevation-4">
              <v-img
                :src="require('@/assets/logo.svg')"
                contain
                max-height="320px"
                max-width="320px"
                class="d-none d-sm-block"
              ></v-img>
              <v-row>
                <v-col>
                  <div class="content fill-height pa-4">
                    <h1 class="display-2 font-weight-bold">Emojicord</h1>
                    <p class="display-1">Discord Emojis in Minecraft</p>
                    <v-btn class="mr-2 text-none" color="#de6a3b" dark disabled>CurseForge</v-btn>
                    <v-btn
                      class="mr-2 text-none"
                      color="white"
                      href="https://github.com/Team-Fruit/Emojicord"
                    >
                      <v-icon left>fab fa-github</v-icon>GitHub
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-flex sm4 xs12 v-for="tile in tiles" :key="tile.title">
            <HomeTile :title="tile.title" :icon="tile.icon" :desc="tile.desc"></HomeTile>
          </v-flex>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import HomeTile from "@/components/home/HomeTile";

export default {
  components: {
    HomeTile
  },
  data: () => ({
    tiles: [
      {
        title: "Guilds",
        icon: "fas fa-users",
        desc: "Invite a bot and get Emoji from the guild"
      },
      {
        title: "Emojis",
        icon: "fas fa-grin-tongue-wink",
        desc: "Choose what you want to use with Emojicord in the Emoji list"
      },
      {
        title: "Download",
        icon: "fas fa-download",
        desc: "Generate download code and import Emoji into Minecraft"
      }
    ]
  })
};
</script>

<style scoped>
.block {
  display: flex;
  margin-top: 120px;
  align-items: flex-end;
  background-color: #23272a;
  height: 220px;
}

.block > .content {
  text-align: top;
}
</style>