<template>
  <v-row class="align-center">
    <v-img
      v-if="icon"
      :src="`https://cdn.discordapp.com/icons/${id}/${icon}.png`"
      max-width="32"
      height="32"
      contain
      class="mx-2"
    ></v-img>
    {{ name }}
  </v-row>
</template>

<script>
export default {
  props: {
    id: String,
    name: String,
    icon: String
  }
};
</script>