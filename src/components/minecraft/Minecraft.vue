<template>
  <v-container :fill-height="getStep()==3">
    <v-layout row wrap>
      <v-flex xs12>
        <v-stepper dark class="xs12">
          <v-stepper-header class="stepper-header">
            <v-stepper-step
              editable
              edit-icon="fas fa-users"
              step="1"
              complete
              @click="to('guild')"
            >Invite a Bot</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
              editable
              edit-icon="fas fa-grin-tongue-wink"
              step="2"
              :complete="getStep()>=2"
              @click="to('emoji')"
            >Choose Emoji</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
              editable
              edit-icon="fas fa-download"
              step="3"
              :complete="getStep()>=3"
              @click="to('save')"
            >Save to Minecraft</v-stepper-step>
          </v-stepper-header>
        </v-stepper>
      </v-flex>
      <router-view></router-view>
      <v-btn
        v-if="getStep()!=3"
        fab
        x-large
        dark
        fixed
        bottom
        right
        color="primary"
        @click="to(getNext())"
      >
        <v-icon>fas fa-angle-right</v-icon>
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  methods: {
    to(to) {
      if (this.$route.name != to) this.$router.push(to);
    },
    getStep() {
      switch (this.$route.name) {
        case "save":
          return 3;
        case "emoji":
          return 2;
        default:
          return 1;
      }
    },
    getNext() {
      switch (this.getStep()) {
        case 1:
          return "emoji";
        case 2:
          return "save";
        default:
          return null;
      }
    }
  }
};
</script>

<style>
.stepper-header {
  background-color: #2c2f33;
}
</style>