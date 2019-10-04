<template>
  <v-row class="align-center">
    <v-img
      v-if="useravatar"
      :src="`https://cdn.discordapp.com/avatars/${userid}/${useravatar}.png`"
      max-width="32"
      height="32"
      contain
      class="mx-2"
    ></v-img>
    {{ username }}#{{ userdiscriminator }}
  </v-row>
</template>

<script>
export default {
  props: {
    userid: String,
    username: String,
    userdiscriminator: String,
    useravatar: String
  }
};
</script>