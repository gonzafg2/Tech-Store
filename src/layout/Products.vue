<template>
  <div class="product-layout">
    <v-container>
      <v-row>
        <v-col cols="12">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "ProductLayout",
});
</script>

<style lang="scss" scoped>
.product-layout {
  margin-top: 65px;
}
</style>
