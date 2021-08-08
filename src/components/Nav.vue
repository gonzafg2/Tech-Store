<template>
  <v-toolbar dark elevate-on-scroll style="max-height: 64px">
    <v-toolbar-title>Tech Store</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon to="/">
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <template v-if="!login">
      <v-btn class="mx-2" fab dark icon @click="setLoginModal(true)">
        <v-icon dark> mdi-login </v-icon>
      </v-btn>
    </template>

    <template v-else>
      <v-btn class="ml-2 mr-1" fab dark icon to="/admin">
        <v-icon dark> mdi-account-circle </v-icon>
      </v-btn>
      <span class="user-name"> Hi, {{ name }}! </span>
      <v-btn class="ml-2" fab dark icon @click="logout">
        <v-icon dark> mdi-logout </v-icon>
      </v-btn>
    </template>
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

.
<style lang="scss" scoped>
.user-name {
  font-size: 12px;
  @media screen and (min-width: 375px) {
    font-size: 14px;
  }
  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
}
</style>
