<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <v-img
          :src="require('@/assets/logo.svg')"
          class="my-3"
          contain
          height="500"
        ></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">Emojicord</h1>
          <a href="https://emojicord.teamfruit.net/api/auth/login">
            <v-btn color="#7289DA">Login with Discord</v-btn>
          </a>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {

    }
  }
}
</script>

