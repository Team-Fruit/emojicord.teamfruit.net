<template>
  <v-card dark tile flat color="rgb(41, 43, 47)" height="70" class="pa-2">
    <v-row justify="start">
      <v-img contain :src="getEmojiUrl()" height="54px" max-width="54px" class="mx-5"></v-img>
      <v-layout column v-if="emoji">
        <p class="title font-weight-bold text my-0">:{{ emoji.name }}:</p>
        <p class="my-0 grey--text">
          from
          <span class="font-weight-bold">{{ guild.name }}</span>
          by
          <span class="font-weight-bold">{{ user.name }}#{{ user.discriminator }}</span>
        </p>
      </v-layout>
      <v-spacer></v-spacer>
      <v-img contain :src="getGuildUrl()" height="54px" max-width="54px" class="mx-5"></v-img>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    emoji: Object,
    guild: Object,
    user: Object
  },
  methods: {
    getEmojiUrl() {
      if (this.emoji)
        return `https://cdn.discordapp.com/emojis/${this.emoji.id}?size=64`;
      return "";
    },
    getGuildUrl() {
      if (this.guild && this.guild.icon)
        return `https://cdn.discordapp.com/icons/${this.guild.id}/${this.guild.icon}?size=64`;
      return "";
    }
  }
};
</script>