<template>
  <v-card class="mx-auto fill-height" color="#23272A" dark>
    <v-card-title>
      <v-icon large left>{{ this.icon }}</v-icon>{{ this.title }}
    </v-card-title>
    <v-card-text>{{ this.desc }}</v-card-text>
    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn color="#43b581">{{ this.title }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    props: {
        title: String,
        icon: String,
        desc: String
    }
}
</script>

<style scoped>
.actions {
    
}
</style>