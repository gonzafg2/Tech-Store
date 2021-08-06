<template>
  <div class="loading">
    <v-progress-circular :size="80" :width="8" indeterminate />
  </div>
</template>

<script lang="ts">
// Libraries
import Vue from "vue";

export default Vue.extend({
  name: "Loading",
});
</script>

<style lang="scss" scoped>
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
