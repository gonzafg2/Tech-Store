<template>
  <v-app-bar
    absolute
    color="white"
    dark
    elevate-on-scroll
  >

    <v-toolbar-title>Tech Store</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn to="/" icon>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Nav",
});
</script>
