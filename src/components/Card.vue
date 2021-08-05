<template>
  <v-col cols="3">
    <v-card class="mx-auto my-12 product">
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
          :to="`/products/${product.id}`"
          color="deep-purple lighten-2"
          text
          >View</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Product",
  props: {
    product: {},
  },
});
</script>

<style lang="scss" scoped>
.product {
  &__title {
    align-items: start;
    font-size: 16px;
    letter-spacing: 0.035em;
    min-height: 130px;
  }
}
</style>
