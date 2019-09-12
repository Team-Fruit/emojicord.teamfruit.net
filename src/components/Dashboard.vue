<template>
  <v-container grid-list-xl>
    <v-layout justify-center>
      <v-flex lg10 md11 xs12>
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
                  color="grey darken-2"
                  dark
                  href="https://github.com/Team-Fruit/Emojicord"
                >
                  <v-icon left>fab fa-github</v-icon>GitHub
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

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