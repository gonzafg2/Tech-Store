<template>
  <v-col cols="12" md="4" lg="3">
    <v-card class="mx-auto my-md-12 product">
      <v-img
        height="250"
        :src="`https://picsum.photos/id/${product.id + 50}/250`"
      ></v-img>

      <v-card-title class="product__title">{{ product.name }}</v-card-title>

      <v-divider class="mx-4"></v-divider>

      <v-card-text class="product__text">
        In stock: <span>{{ product.quantity }}</span>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-actions>
        <v-btn
          color="deep-purple lighten-2"
          text
          :loading="go"
          @click="goProduct(product.id)"
          >View</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script lang="ts">
// Libraries
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
// Components

export default Vue.extend({
  name: "Product",
  data() {
    return {
      go: false,
    };
  },
  props: {
    product: {},
  },
  methods: {
    goProduct(id: number) {
      this.go = true;
      this.$router.push(`/products/${id}`);
      this.go = false;
    },
  },
});
</script>

<style lang="scss" scoped>
.product {
  &__title {
    align-items: start;
    font-size: 16px;
    letter-spacing: 0.035em;
    @media screen and (min-width: 768px) {
      min-height: 130px;
    }
  }
}
</style>
