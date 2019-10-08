<template>
  <v-row class="align-center">
    <v-img
      v-if="avatar"
      :src="`https://cdn.discordapp.com/avatars/${id}/${avatar}`"
      max-width="32"
      height="32"
      contain
      class="mx-2"
    ></v-img>
    <v-img v-else max-width="32" class="mx-2"></v-img>
    {{ name }}#{{ discriminator }}
  </v-row>
</template>

<script>
export default {
  props: {
    id: String,
    name: String,
    discriminator: String,
    avatar: String
  }
};
</script>