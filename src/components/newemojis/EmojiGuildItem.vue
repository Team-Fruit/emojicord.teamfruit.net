<template>
  <v-list-group v-if="guilds" dark :value="expand">
    <template v-slot:activator>
      <v-list-item-title>{{ title }}</v-list-item-title>
    </template>
    <v-list-item dark link v-for="guild in guilds" :key="guild.id">
      <v-list-item-avatar>
        <v-img
          v-if="guild.icon"
          :src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}?size=64`"
        ></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ guild.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list-group>
</template>

<script>
export default {
  props: {
    guilds: Array,
    expand: Boolean,
    title: String
  }
};
</script>