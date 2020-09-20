<template>
  <v-list-item inactive :disabled="disabled">
    <template v-slot:default="{ active }">
      <v-list-item-action>
        <v-checkbox :input-value="active"></v-checkbox>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>{{ title }}</v-list-item-title>
        <v-list-item-subtitle>{{ subtitle }}</v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </v-list-item>
</template>

<script>
export default {
    props: {
        title: String,
        subtitle: String,
        disabled: Boolean
    }
}
</script>