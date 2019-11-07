<template>
  <v-progress-linear v-if="!isFetched" :indeterminate="true"></v-progress-linear>
  <v-container v-else>
    <v-card dark>
      <v-container>
        <h1 class="display-1 font-weight-bold mb-4">Emojis</h1>
        <p
          class="title font-weight-regular"
        >To get emoji from Discord, Bot must belong. Invite Emojicord bot to use your Emoji!</p>
      </v-container>
      <v-card-title>
        <v-row no-gutters style="height: 50px;">
          <v-col v-if="!selected.length" cols="12" sm="8" align-self="center">Your Emoji</v-col>
          <v-flex v-else>
            <v-col class="align-content-end">
              {{ selected.length }}
              <template v-if="selected.length == 1">Item</template>
              <template v-else>Items</template>
              Selected:
              <v-btn
                color="success"
                class="mx-1"
                v-if="selected.some(v=>!v.enabled)"
                @click="switchAll(true)"
              >Enable</v-btn>
              <v-btn
                color="error"
                class="mx-1"
                v-if="selected.some(v=>v.enabled)"
                @click="switchAll(false)"
              >Disable</v-btn>
            </v-col>
          </v-flex>
          <!-- <v-select
          :items="emojis.guilds"
          label="Select Guild"
          item-text="name"
          item-value="name"
          single-line
          hide-details
          dark
          class="ml-2"
        >
          <template slot="selection" slot-scope="data">
            <v-img
              v-if="data.item.icon"
              :src="`https://cdn.discordapp.com/icons/${data.item.id}/${data.item.icon}`"
              max-width="32"
              height="32"
              contain
              class="mx-2"
            ></v-img>
            <v-img v-else max-width="32" class="mx-2"></v-img>
            {{ data.item.name }}
          </template>
          <template slot="item" slot-scope="data">
            <v-img
              v-if="data.item.icon"
              :src="`https://cdn.discordapp.com/icons/${data.item.id}/${data.item.icon}`"
              max-width="32"
              height="32"
              contain
              class="mx-2"
            ></v-img>
            <v-img v-else max-width="32" class="mx-2"></v-img>
            {{ data.item.name }}
          </template>
          </v-select>-->
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              dark
              single-line
              hide-details
              clearable
              class="ml-2"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>
      <EmojiTable :search="search" @selected="selected = $event" @change-state="onSwitch($event)"></EmojiTable>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import EmojiTable from "@/components/emojis/EmojiTable";

export default {
  components: {
    EmojiTable
  },
  data() {
    return {
      search: "",
      selected: []
    };
  },
  mounted() {
    this.fetch();
  },
  computed: {
    ...mapGetters("emoji", ["isFetched", "getEmojis", "getGuild", "getUser"])
  },
  methods: {
    ...mapActions("http", ["get", "put", "delete"]),
    ...mapActions("emoji", ["fetch"]),
    ...mapMutations("emoji", ["setEmojis"]),
    toggleEmoji(id) {
      const emoji = this.getEmojis.emojis.find(i => i.id == id);
      this.$set(emoji, "enabled", !emoji.enabled);
    },
    toggleAllEmoji(ids) {
      ids.forEach(e => this.toggleEmoji(e));
    },
    enable(id) {
      return this.put(`/user/emojis/${id}`);
    },
    disable(id) {
      return this.delete(`/user/emojis/${id}`);
    },
    onSwitch(v) {
      if (v.enabled)
        this.enable(v.id).catch(err => {
          this.toggleEmoji(v.id);
          return err;
        });
      else
        this.disable(v.id).catch(err => {
          this.toggleEmoji(v.id);
          return err;
        });
    },
    switchAll(enable) {
      const ids = this.selected
        .filter(a => a.enabled == !enable)
        .map(a => a.id);

      this.toggleAllEmoji(ids);

      const join = ids.join(",");

      if (enable)
        this.enable(join).catch(err => {
          this.toggleAllEmoji(ids);
          return err;
        });
      else
        this.disable(join).catch(err => {
          this.toggleAllEmoji(ids);
          return err;
        });
    }
  }
};
</script>

<style scoped>
.colon {
  color: #99aab5;
}

.guild_menu {
  background-color: gray;
}
</style>