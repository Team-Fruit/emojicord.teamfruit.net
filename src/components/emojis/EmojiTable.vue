<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="getEmojis"
    :search="search"
    :custom-filter="customFilter"
    :footer-props="{
            'items-per-page-options': [50, 100, -1]
        }"
    :items-per-page="30"
    show-select
    dark
  >
    <template v-slot:item.enabled="{ item }">
      <v-switch v-model="item.enabled" color="success" class="mx-2" dark @change="$emit('change-state', item)"></v-switch>
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
</template>

<script>
import { mapGetters } from "vuex";
import GuildChip from "@/components/emojis/GuildChip";
import UserChip from "@/components/emojis/UserChip";

export default {
  components: {
    GuildChip,
    UserChip
  },
  props: {
    search: String
  },
  computed: {
    ...mapGetters("emoji", ["getEmojis", "getGuild", "getUser"])
  },
  watch: {
    selected(items) {
      this.$emit("selected", items);
    }
  },
  data() {
    return {
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
  methods: {
    customFilter(v, s, i) {
      const text = s.toLowerCase().trim();
      const user = this.getUser(i.userid);
      return (
        i.name.toLowerCase().includes(text) ||
        (user.name + "#" + user.discriminator).toLowerCase().includes(text)
      );
    }
  }
};
</script>