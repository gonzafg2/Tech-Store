<template>
  <v-toolbar dark elevate-on-scroll style="max-height: 64px">
    <v-toolbar-title>Tech Store</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon to="/">
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn v-if="!login" class="mx-2" fab dark icon @click="setLoginModal(true)">
      <v-icon dark> mdi-login </v-icon>
    </v-btn>

    <v-btn v-else class="mx-2" fab dark icon to="/admin">
      <v-icon dark> mdi-account-circle </v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations, mapState } from "vuex";
export default Vue.extend({
  name: "Nav",
  methods: {
    ...mapMutations("access", ["setLoginModal"]),
  },
  computed: {
    ...mapState("access", ["login"]),
  },
});
</script>
