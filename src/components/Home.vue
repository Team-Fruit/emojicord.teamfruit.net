<template>
  <v-content>
    <v-container fill-height>
      <v-layout align-center>
        <v-flex xs12 text-center mb-4>
          <v-img :src="require('@/assets/logo.svg')" contain height="512" class="mb-3"></v-img>
          <!-- </v-flex> -->

          <!-- <v-flex text-center mb-4> -->
          <h1 class="display-2 font-weight-bold mb-3">Emojicord</h1>
          <v-btn
            color="#7289DA"
            href="https://emojicord.teamfruit.net/api/auth/login"
          >Login with Discord</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
