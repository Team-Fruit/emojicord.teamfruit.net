<template>
  <v-card dark class="mt-auto" outlined tile color="#2f3136">
    <span v-if="!isConnected" class>Open from Minecraft to Save</span>
    <v-btn block color="warning" :disabled="!isConnected" @click="save">Save</v-btn>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("emoji", ["getEmojisForMC"]),
    ...mapGetters("minecraft", ["getPort", "getKey", "isConnected"])
  },
  methods: {
    ...mapActions("http", ["postLocalHost"]),
    ...mapActions("minecraft", ["disconnect"]),
    save() {
      this.postLocalHost({
        port: this.getPort,
        key: this.getKey,
        data: this.getEmojisForMC
      }).then(res => {
        if (res.status === 200 || res.status === 204) this.disconnect();
      });
    }
  }
};
</script>