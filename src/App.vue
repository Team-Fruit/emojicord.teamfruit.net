<template>
  <div>
    <v-app>
      <Header></Header>
      <router-view></router-view>
    </v-app>
    <notifications group="alert" position="bottom right" classes="notification-style" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import { mapGetters } from "vuex";

export default {
  components: {
    Header
  },
  computed: {
    ...mapGetters("auth", {
      isLoggedin: "isLoggedin"
    })
  }
};
</script>


<style lang="scss">
#app {
  background-color: #2c2f33;
  color: #99aab5;
}

@for $i from 1 through 6 {
  h#{$i} {
    color: #ffffff;
  }
}

.notification-style {
  padding: 10px;
  margin: 0 5px 5px;

  font-size: 12px;

  color: #ffffff;
  background: #44a4fc;
  border-left: 5px solid #187fe7;

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: #e54d42;
    border-left-color: #b82e24;
  }

  &.success {
    background: #68cd86;
    border-left-color: #42a85f;
  }
}
</style>

