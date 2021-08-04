<template>
  <div class="home"></div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";

export default Vue.extend({
  name: "Home",
  methods: {
    ...mapActions("access", ["getToken"]),
  },
  created() {
    this.getToken();
  },
});
</script>
