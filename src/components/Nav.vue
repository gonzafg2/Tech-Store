<template>
  <v-toolbar dark elevate-on-scroll>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Tech Store</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn class="mx-2" fab dark icon to="/admin">
        <v-icon dark> mdi-format-list-bulleted-square </v-icon>
      </v-btn>
    </v-toolbar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Nav",
});
</script>
