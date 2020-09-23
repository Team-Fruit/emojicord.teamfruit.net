<template>
  <v-card
    class="pa-2 emoji"
    flat
    height="80px"
    width="80px"
    @mouseenter="onEnter()"
    @mouseleave="onLeave()"
    @click.stop="dialog = true"
  >
    <v-img
      contain
      :src="`https://cdn.discordapp.com/emojis/${emoji.id}?size=64`"
      height="64px"
      width="64px"
    ></v-img>

    <v-dialog v-model="dialog" width="unset">
      <v-card dark>
        <v-container>
          <v-row>
            <v-col cols="auto">
              <v-img
                contain
                :src="`https://cdn.discordapp.com/emojis/${emoji.id}?size=64`"
                height="64px"
                width="64px"
              ></v-img>
            </v-col>
            <v-col cols="auto" class>
              <v-row class="flex-column fill-height" justify="center">
                <v-col class="emojiname">:{{ this.emoji.name }}:</v-col>
                <v-col class="py-0">
                  <v-switch
                    v-model="this.emoji.enabled"
                    class="my-0"
                    color="blue"
                    hide-details
                    label="Include in Minecraft"
                    @change="onChangeInclude()"
                  ></v-switch>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    emoji: Object,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    ...mapActions("http", ["put", "delete"]),
    onEnter() {
      this.$emit("onHover", this.emoji);
    },
    onLeave() {
      this.$emit("onHover", null);
    },
    // TODO: コンポーネントでやるのは不適切で、Vuexに持っていくべき.
    // TODO: 親に渡していないので何もアップデートされません、上記で同時に解決出来そう.
    onChangeInclude() {
      if (this.emoji.enable) {
        this.put(`/user/emojis/${this.emoji.id}`).catch((err) => {
          this.emoji.enable = false;
          return err;
        });
      } else {
        this.delete(`/user/emojis/${this.emoji.id}`).catch((err) => {
          this.emoji.enable = true;
          return err;
        });
      }
    },
  },
};
</script>

<style scoped>
.emoji {
  background-color: transparent;
}

.emoji:hover {
  background-color: rgb(79, 84, 92);
}

.emojiname {
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: top;
}
</style>