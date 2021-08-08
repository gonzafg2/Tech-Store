<template>
  <v-app>
    <Nav />
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <Loading v-if="loading" />
    <Login />
  </v-app>
</template>

<script lang="ts">
// Libraries
import Vue from "vue";
import { mapState, mapMutations, mapActions } from "vuex";
// Components
import Nav from "@/components/Nav.vue";
import Loading from "@/components/Loading.vue";
import Login from "@/components/Login.vue";
// Types
import { dataItems } from "@/types";

export default Vue.extend({
  name: "App",
  components: {
    Nav,
    Loading,
    Login,
  },
  computed: {
    ...mapState(["loading"]),
    ...mapState("access", ["token", "login"]),
    ...mapState("products", ["items"]),
  },
  methods: {
    ...mapActions("access", ["getToken"]),
    ...mapActions("products", ["getItems", "getItemsDetails"]),
    ...mapActions("categories", ["getCategories"]),
  },
  created() {
    this.getToken();
  },
  watch: {
    async token(newValue: string | null): Promise<void> {
      if (!newValue) return;
      await this.getItems();
      await this.getCategories();
    },
    async items(newValue: [dataItems] | null): Promise<void> {
      if (!newValue || !newValue.length) return;
      await this.getItemsDetails();
    },
  },
});
</script>

<style lang="scss" scoped>
#app {
  min-height: 100vh;
}
</style>
