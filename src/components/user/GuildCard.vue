<template>
  <v-card
    v-on:mouseover="mouseover"
    v-on:mouseleave="mouseleave"
    color="#23272A"
    max-width="256px"
    height="100%"
    class="mx-auto"
  >
    <v-img v-if="icon" :src="getIconURL()" flood>
      <v-container v-if="hover" fluid pa-0>
        <v-layout>
          <v-flex xs12 pa-2 class="servername">
            <span class="headline white--text">{{ name }}</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
    <v-container v-else class="headline white--text" fill-height fluid>
      <v-layout align-center justify-center fill-height>
        <v-flex xs12 pa-2 class="text-xs-center">
          <span class="headline white--text">{{ name }}</span>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      hover: false
    };
  },
  props: {
    id: String,
    name: String,
    icon: String
  },
  methods: {
    getIconURL() {
      return `https://cdn.discordapp.com/icons/${this.id}/${this.icon}.png`;
    },
    mouseover() {
      this.hover = true;
    },
    mouseleave() {
      this.hover = false;
    }
  }
};
</script>

<style>
.card:hover {
  transform: scale(1.2) rotate(9deg);
  transition-duration: 0.5s;
}

.servername {
  background-color: rgba(33, 33, 33, 0.8);
}
</style>
