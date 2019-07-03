<template>
  <div>
    <v-alert :value="exits" :type="type" dark>{{ message }}</v-alert>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState('alert', {
      message: 'message',
      type: 'type'
    }),
    ...mapGetters('alert', {
      exits: 'exits'
    })
  }
};
</script>
