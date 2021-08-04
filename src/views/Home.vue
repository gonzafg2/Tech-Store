<template>
  <div class="home">
    <h1 class="home__title">Tech Store</h1>
    <v-container>
      <v-row>
        <Card v-for="(item, i) in activeItems" :product="item" :key="i" />
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Card from "@/components/Card.vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "Home",
  components: {
    Card,
  },
  computed: {
    ...mapGetters("products", ["activeItems"]),
  },
});
</script>

<style lang="scss" scoped>
.home {
  padding-top: 64px;
  &__title {
    display: flex;
    justify-content: center;
    margin: 50px 0;
  }
}
</style>
