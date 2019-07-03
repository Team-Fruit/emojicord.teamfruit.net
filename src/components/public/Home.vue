<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <Alert></Alert>
        <v-img :src="require('@/assets/logo.svg')" class="my-3" contain height="500"></v-img>
      </v-flex>

      <v-flex text-xs-center  mb-4>
        <h1 class="display-2 font-weight-bold mb-3">Emojicord</h1>
        <a href="https://emojicord.teamfruit.net/api/auth/login">
          <v-btn color="#7289DA">Login with Discord</v-btn>
        </a>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Alert from '@/components/Alert'

export default {
  components: {
    Alert
  }
}
</script>


