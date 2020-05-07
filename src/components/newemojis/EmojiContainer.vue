<template>
  <v-container>
    <v-row class="px-1 mx-auto" justify="start">
      <EmojiItem v-for="emoji in emojis" :key="emoji.id" :emoji="emoji.id" @onHover="onHover"></EmojiItem>
    </v-row>
  </v-container>
</template>

<script>
import EmojiItem from "@/components/newemojis/EmojiItem";
export default {
  components: {
    EmojiItem
  },
  props: {
    emojis: Array
  },
  data() {
    return {
      hover: ""
    };
  },
  methods: {
    onHover(id) {
      this.$emit("onHover", id);
    }
  }
};
</script>