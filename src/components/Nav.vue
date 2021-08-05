<template>
  <v-app-bar absolute color="white" dark elevate-on-scroll>
    <v-toolbar-title>Tech Store</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn to="/" icon>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn class="mx-2" fab dark color="teal" to="/admin">
      <v-icon dark> mdi-format-list-bulleted-square </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Nav",
});
</script>
