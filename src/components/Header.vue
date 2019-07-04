<template>
  <v-toolbar dark color="#202225" height="60px">
    <v-img :src="require('@/assets/header.svg')" contain height="38px" max-width="250px"></v-img>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>Guild</v-btn>
      <v-btn flat>Emoji</v-btn>
      <v-btn flat>Download</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
