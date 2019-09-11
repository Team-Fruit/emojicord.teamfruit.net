<template>
  <v-container grid-list-xl>
    <v-layout justify-center>
      <v-flex lg10 md11 xs12>
        <div class="block">
          <v-img
            :src="require('@/assets/logo.svg')"
            contain
            max-height="363px"
            max-width="363px"
            class="d-none d-sm-block"
          ></v-img>
          <div class="content fill-height pa-4">
            <h1 class="display-2 font-weight-bold">Dashboard</h1>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>
.block {
  display: flex;
  margin-top: 110px;
  align-items: flex-end;
  background-color: #23272a;
  height: 260px;
}

.block > .content {
    text-align: top;
}
</style>