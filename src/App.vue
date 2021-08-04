<template>
  <div id="app">
    <Nav />

    <router-view />

    <div class="loading" v-if="loading">
      <v-progress-circular
        :size="70"
        :width="7"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import Nav from "@/components/Nav.vue";

export default Vue.extend({
  name: "App",
  data() {
    return {
      loading: true,
    };
  },
  components: {
    Nav,
  },
  computed: {
    ...mapState("access", ["token"]),
  },
  methods: {
    ...mapActions("access", ["getToken"]),
    ...mapActions("products", ["getItems"]),
  },
  created() {
    this.getToken();
  },
  watch: {
    async token(newValue) {
      if (!newValue) return;
      await this.getItems();
      this.loading = false;
    },
  },
});
</script>

<style lang="scss" scoped>
#app {
  min-height: 100vh;
}
.loading {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  .v-progress-circular {
    color: purple;
  }
}
</style>
