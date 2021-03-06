<template>
  <div>
    <v-container v-for="guild in filteredGuilds" :key="guild.id" :id="`guild-${guild.id}`">
      <v-subheader dark>{{guild.name}}</v-subheader>
      <v-layout row wrap justify-center>
        <v-container fluid>
          <transition-group name="flip-list" tag="div" class="layout row wrap">
            <v-flex
              class="flex-grow-0 list-item"
              v-for="emoji in filteredEmojis.filter(v => v.guildid == guild.id)"
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
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    search: String
  },
  mounted() {
    this.$nextTick(function() {
      if (this.$route.query.guild) {
        this.$vuetify.goTo(`#guild-${this.$route.query.guild}`);
      }
    });
  },
  computed: {
    ...mapGetters("emoji", ["getEmojis", "getGuilds"]),
    filteredEmojis: function() {
      if (!this.search) return this.getEmojis;
      return this.getEmojis.filter(emoji =>
        emoji.name.toLowerCase().includes(this.search.toLowerCase().trim())
      );
    },
    filteredGuilds: function() {
      const emojis = this.filteredEmojis;
      return this.getGuilds.filter(guild =>
        emojis.some(emoji => emoji.guildid === guild.id)
      );
    }
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