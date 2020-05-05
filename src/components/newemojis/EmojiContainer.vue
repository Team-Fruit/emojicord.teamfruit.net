<template>
  <v-container>
    <v-row class="px-3" justify="start">
      <v-avatar v-for="emoji in emojis" :key="emoji.id" class="ma-1" tile>
        <v-img :src="`https://cdn.discordapp.com/emojis/${emoji.id}?size=64`"></v-img>
      </v-avatar>
    </v-row>
  </v-container>
</template>

<script>
export default {
    props: {
        emojis: Array
    }
}
</script>