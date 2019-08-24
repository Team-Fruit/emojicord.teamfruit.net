<template>
  <!-- <v-card
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
  </v-card>-->
  <v-card class="mx-auto" color="#23272A">
    <v-row class="py-4 pl-4">
      <v-col class="shrink">
        <v-img v-if="icon" height="128" width="128" :src="getIconURL()"></v-img>
      </v-col>
      <v-col class="text-center">
        <v-container class="pa-0">
          <v-row>
            <v-col>
              <v-card-text>
                <div class="white--text headline mb-2">{{ name }}</div>
                <div v-if="isOwner" class="green--text">Owner</div>
                <div v-else-if="!canInvite&&!botExists" class="red--text">Not Enough Permissions</div>
              </v-card-text>
            </v-col>
          </v-row>
          <v-row justify="end">
            <v-col>
              <v-btn v-if="botExists" depressed color="success">Ready</v-btn>
              <v-btn v-else-if="canInvite" depressed color="warning">Invite Bot</v-btn>
              <v-btn v-else depressed color="error">Copy Invie Link</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    id: String,
    name: String,
    icon: String,
    isOwner: Boolean,
    botExists: Boolean,
    canInvite: Boolean
  },
  methods: {
    getIconURL() {
      return `https://cdn.discordapp.com/icons/${this.id}/${this.icon}.png`;
    }
  }
};
</script>
