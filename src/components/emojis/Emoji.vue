<template>
  <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>
  <v-container v-else>
    <v-card dark>
      <v-card-title>
         Your Emoji
        <div class="flex-grow-1"></div>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="emojis.emojis"
        item-key="id"
        :search="search"
        :custom-filter="customFilter"
        :footer-props="{
            'items-per-page-options': [10, 20, 30, 40, 50]
        }"
        :items-per-page="30"
        show-select
        dark
      >
        <template v-slot:item.guildid="{ item }">
          <GuildChip v-bind="getGuild(item.guildid)"></GuildChip>
        </template>
        <template v-slot:item.id="{ item }">
          <v-img
            :src="`https://cdn.discordapp.com/emojis/${item.id}`"
            width="32"
            height="32"
            contain
          ></v-img>
        </template>
        <template v-slot:item.name="{ item }">
          <span class="colon">:</span>
          {{item.name}}
          <span class="colon">:</span>
        </template>
        <template v-slot:item.userid="{ item }">
          <UserChip v-bind="item"></UserChip>
        </template>
        <template v-slot:item.enabled="{ item }">
          <v-btn v-if="item.enabled" color="success">Enable</v-btn>
          <v-btn v-else>Disable</v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import GuildChip from "@/components/emojis/GuildChip";
import UserChip from "@/components/emojis/UserChip";

export default {
  components: {
    GuildChip,
    UserChip
  },
  data() {
    return {
      loading: true,
      emojis: {},
      search: "",
      headers: [
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
        { text: "Uploaded By", value: "userid" },
        { text: "Enabled", value: "enabled", width: 100, align: "center" }
      ]
    };
  },
  mounted() {
    this.get("/user/emojis")
      .then(res => {
        this.loading = false;
        this.emojis = res.data;
      })
      .catch(err => err);
  },
  methods: {
    ...mapActions("http", ["get"]),
    getGuild(guildid) {
      return this.emojis.guilds.find(v => v.id == guildid);
    },
    customFilter(v, s, i) {
      const text = s.toLowerCase().trim();
      return (
        i.name.toLowerCase().includes(text) ||
        i.username.toLowerCase().includes(text)
      );
    }
  }
};
</script>

<style scoped>
.colon {
  color: #99aab5;
}
</style>