<template>
  <v-container fill-height>
    <v-layout row wrap justify-center align-center>
      <v-form>
        <!-- <v-text-field v-model="port" label="Port" single-line dark></v-text-field> -->
        <v-btn color="success" @click="post()">POST</v-btn>
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      // port: 36436
    };
  },
  methods: {
    ...mapActions("http", ["postLocalHost"]),
    post() {
      this.postLocalHost({
        port: this.port,
        key: this.key,
        data: {
          id: this.user.id,
          name: `${this.user.username}#${this.user.discriminator}`,
          groups: [
            {
              name: "Fruit Talks",
              id: "544075008297664523",
              emojis: [
                {
                  name: "fruit",
                  id: "239603279762423808"
                }
              ]
            }
          ]
        }
      });
    }
  },
  computed: {
    ...mapGetters({
      port: "minecraft/getPort",
      key: "minecraft/getKey",
      user: "auth/getUser"
    })
  }
};
</script>