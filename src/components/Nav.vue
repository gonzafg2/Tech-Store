<template>
  <v-toolbar dark elevate-on-scroll style="max-height: 64px">
    <v-toolbar-title>Tech Store</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon to="/">
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn
      v-if="!login"
      class="mx-2"
      fab
      dark
      icon
      @click="setLoginModal(true)"
    >
      <v-icon dark> mdi-login </v-icon>
    </v-btn>

    <v-btn v-else class="ml-2 mr-1" fab dark icon to="/admin">
      <v-icon dark> mdi-account-circle </v-icon>
    </v-btn>
    Hi, {{ name }}!

    <v-btn v-if="login" class="ml-2" fab dark icon @click="logout">
      <v-icon dark> mdi-logout </v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script lang="ts">
// Libraries
import Vue from "vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default Vue.extend({
  name: "Nav",
  computed: {
    ...mapState("access", ["login", "name"]),
  },
  methods: {
    ...mapMutations("access", ["setLoginModal"]),
    ...mapActions("access", ["logout"]),
  },
});
</script>
