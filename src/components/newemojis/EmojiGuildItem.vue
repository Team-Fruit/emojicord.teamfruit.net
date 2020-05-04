<template>
  <v-list-group v-if="guilds" dark :value="expand">
    <template v-slot:activator>
      <v-list-item-title>{{ title }}</v-list-item-title>
    </template>
    <v-list-item
      dark
      :link="permission"
      v-for="guild in guilds"
      :key="guild.id"
      :href="permission ?  getInviteURL(guild.id) : null"
      target="_blank"
      @click="onClick(guild.id)"
    >
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
    ready: Boolean,
    expand: Boolean,
    permission: Boolean,
    title: String
  },
  methods: {
    getInviteURL(id) {
      return `https://discordapp.com/oauth2/authorize?client_id=588765615695855658&permissions=1073741824&scope=bot&guild_id=${id}`;
    },
    onClick(id) {
      if (this.ready) this.$emit("select", id);
    }
  }
};
</script>