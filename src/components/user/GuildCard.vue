<template>
  <v-card class="mx-auto fill-height" color="#23272A">
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
              <v-btn
                v-else-if="canInvite"
                depressed
                color="warning"
                :href="getInviteURL()"
                target="_blank"
              >Invite Bot</v-btn>
              <v-btn v-else depressed color="error" :loading="copied" @click="copyInviteURL()">
                Copy Invie Link
                <template v-if="copyError" v-slot:loader>Can Not Copy</template>
                <template v-else v-slot:loader>Copied</template>
              </v-btn>
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
  data() {
    return {
      copied: false,
      copyError: false
    };
  },
  methods: {
    getIconURL() {
      return `https://cdn.discordapp.com/icons/${this.id}/${this.icon}.png`;
    },
    getInviteURL() {
      return `https://discordapp.com/oauth2/authorize?client_id=588765615695855658&permissions=1073741824&scope=bot&guild_id=${this.id}`;
      // return `https://discordapp.com/oauth2/authorize?client_id=588765615695855658&permissions=1073741824&redirect_uri=https%3A%2F%2Femojicord.teamfruit.net%2Fuser%2Fguild&scope=bot&response_type=code&guild_id=${this.id}`;
    },
    copyInviteURL() {
      this.$copyText(this.getInviteURL()).then(
        () => {
          this.copied = true;
          this.copyError = false;
          setTimeout(() => (this.copied = false), 3000);
        },
        () => {
          this.copied = false;
          this.copyError = true;
          setTimeout(() => (this.copyError = false), 3000);
        }
      );
    }
  }
};
</script>
