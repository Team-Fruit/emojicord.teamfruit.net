<template>
  <v-card
    class="pa-2 emoji"
    flat
    height="80px"
    width="80px"
    @mouseenter="onEnter()"
    @mouseleave="onLeave()"
  >
    <v-img
      contain
      :src="`https://cdn.discordapp.com/emojis/${emoji}?size=64`"
      height="64px"
      width="64px"
    ></v-img>
  </v-card>
</template>

<script>
export default {
  props: {
    emoji: String
  },
  data() {
    return {
      hover: false
    };
  },
  methods: {
    onEnter() {
      this.hover = true;
      this.$emit("onHover", this.emoji);
    },
    onLeave() {
      this.hover = false;
      this.$emit("onHover", null);
    }
  }
};
</script>

<style scoped>
.emoji {
  background-color: transparent;
}

.emoji:hover {
  background-color: rgb(79, 84, 92);
}
</style>