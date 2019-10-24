<template>
  <v-progress-linear v-if="!isFetched" :indeterminate="true"></v-progress-linear>
  <v-container v-else>
    <v-card dark>
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
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="getEmojis.emojis"
        :search="search"
        :custom-filter="customFilter"
        :footer-props="{
            'items-per-page-options': [10, 20, 30, 40, 50]
        }"
        :items-per-page="30"
        show-select
        dark
      >
        <template v-slot:item.enabled="{ item }">
          <v-switch
            v-model="item.enabled"
            color="success"
            class="mx-2"
            dark
            @change="onSwitch(item)"
          ></v-switch>
        </template>
        <template v-slot:item.guildid="{ item }">
          <GuildChip v-bind="getGuild(item.guildid)"></GuildChip>
        </template>
        <template v-slot:item.id="{ item }">
          <v-img
            :src="`https://cdn.discordapp.com/emojis/${item.id}`"
            width="32"
            height="32"
            class="mx-2"
            contain
          ></v-img>
        </template>
        <template v-slot:item.name="{ item }">
          <span class="colon">:</span>
          {{item.name}}
          <span class="colon">:</span>
        </template>
        <template v-slot:item.userid="{ item }">
          <UserChip v-bind="getUser(item.userid)  "></UserChip>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import GuildChip from "@/components/emojis/GuildChip";
import UserChip from "@/components/emojis/UserChip";

export default {
  components: {
    GuildChip,
    UserChip
  },
  data() {
    return {
      search: "",
      selected: [],
      headers: [
        {
          text: "Enabled",
          value: "enabled",
          width: 100,
          align: "center",
          sortable: false,
          filterable: false
        },
        { text: "Guild", value: "guildid", filterable: false },
        {
          text: "Emoji",
          value: "id",
          sortable: false,
          filterable: false,
          width: 64,
          align: "center"
        },
        { text: "Alias", value: "name", width: 300 },
        { text: "Uploaded By", value: "userid" }
      ]
    };
  },
  mounted() {
    this.fetch()
  },
  computed: {
    ...mapGetters("emoji", ["isFetched", "getEmojis", "getGuild", "getUser"])
  },
  methods: {
    ...mapActions("http", ["get", "put", "delete"]),
    ...mapActions("emoji", ["fetch"]),
    ...mapMutations("emoji", ["setEmojis"]),
    customFilter(v, s, i) {
      const text = s.toLowerCase().trim();
      const user = this.getUser(i.userid);
      return (
        i.name.toLowerCase().includes(text) ||
        (user.name + "#" + user.discriminator).toLowerCase().includes(text)
      );
    },
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