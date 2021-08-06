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
// Libraries
import Vue from "vue";
import { mapGetters } from "vuex";
// Components
import Card from "@/components/Card.vue";

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
  &__title {
    display: flex;
    justify-content: center;
    margin: 50px 0;
  }
}
</style>
