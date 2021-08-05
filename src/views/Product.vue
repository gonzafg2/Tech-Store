<template v-if="product">
  <div class="product mt-5">
    <h2 class="product__title">{{ product.name }}</h2>
    <v-card>
      <v-img
        :src="`https://picsum.photos/id/${product.id + 50}/1000/250`"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="250px"
      >
      </v-img>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-bookmark</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

    <h3 class="product__desc">Description:</h3>
    <p class="product__desc-text">
      {{ product.description }}
    </p>

    <h3 class="product__price">Price:</h3>
    <p class="product__price-text">
      ${{ product.priceTaxExcluded.toLocaleString() }}
    </p>

    <v-btn class="product__cta" rounded push color="primary" dark>Buy Now</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "Product",
  data() {
    return {
      product: null,
    };
  },
  computed: {
    id(): number {
      const id = this.$route.params.id;
      return Number(id);
    },
    ...mapGetters("products", ["item"]),
  },
  methods: {
    getProduct(id: number) {
      if (!id) return;
      this.product = this.item(id);
    },
  },
  mounted() {
    this.getProduct(this.id);
  },
  watch: {
    product(newValue, oldValue) {
      console.log(newValue, oldValue);
    }
  },
});
</script>

<style lang="scss" scoped>
.product {
  &__title {
    display: flex;
    justify-content: center;
    margin: 10px 0 20px;
  }
  &__desc {
    margin: 10px 0;
  }
  &__desc-text {
    margin-bottom: 10px;
  }
  &__price {
    margin: 10px 0;
  }
  &__cta {
    margin: 10px 0;
  }
}
</style>
