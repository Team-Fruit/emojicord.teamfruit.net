<template>
  <div>
    <v-container justify-center v-for="guild in getEmojis.guilds" :key="guild.id">
      <v-subheader>{{guild.name}}</v-subheader>
      <transition-group name="flip-list" tag="div" class="layout row wrap">
        <v-flex
          class="flex-grow-0 list-item"
          v-for="emoji in getEmojis.emojis.filter(v => v.guildid == guild.id)"
          :key="emoji.id"
        >
          <v-tooltip dark right>
            <template v-slot:activator="{ on }">
              <v-img
                :src="`https://cdn.discordapp.com/emojis/${emoji.id}`"
                width="64"
                height="64"
                class="ma-1"
                contain
                v-on="on"
              ></v-img>
            </template>
            <span>:{{ emoji.name }}:</span>
          </v-tooltip>
        </v-flex>
      </transition-group>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("emoji", ["getEmojis", "getGuild", "getUser"])
  }
};
</script>

<style>
.list-item {
  transition: all 1s;
}

.flip-list-enter,
.flip-list-leave-to {
  opacity: 0;
  transition: transform 1s;
}

.flip-list-leave-active {
  opacity: 0;
  position: absolute;
}
</style>