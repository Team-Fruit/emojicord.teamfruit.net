<template>
  <v-container>
    <v-row class="px-1 mx-auto" justify="start">
      <v-hover v-for="emoji in emojis" :key="emoji.id" v-slot:default="{ hover }">
        <v-card
          :color="hover ? 'rgb(79, 84, 92)' : 'transparent' "
          class="pa-2"
          flat
          height="80px"
          width="80px"
        >
          <v-img
            contain
            :src="`https://cdn.discordapp.com/emojis/${emoji.id}?size=64`"
            height="64px"
            width="64px"
          ></v-img>
        </v-card>
      </v-hover>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    emojis: Array
  }
};
</script>

<style>
.hover {
  background-color: aqua;
}
</style>