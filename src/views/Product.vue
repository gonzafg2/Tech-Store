<template v-if="itemP">
  <div class="product mt-5">
    <h2 class="product__title">{{ itemP && itemP.name }}</h2>
    <v-card>
      <v-img
        :src="`https://picsum.photos/id/${itemP && itemP.id + 50}/1000/250`"
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
      {{ itemP && itemP.description }}
    </p>

    <h3 class="product__price">Price:</h3>
    <p class="product__price-text">
      ${{ itemP && itemP.priceTaxExcluded.toLocaleString() }}
    </p>

    <v-btn
      class="product__cta"
      rounded
      push
      color="primary"
      dark
      @click.stop="toBuy(true)"
      >Buy Now</v-btn
    >
    <Buy />
  </div>
</template>

<script lang="ts">
// Libraries
import Vue from "vue";
import { mapState, mapMutations, mapGetters } from "vuex";
// Components
import Buy from "@/components/Buy.vue";

export default Vue.extend({
  name: "Product",
  data() {
    return {
      product: null,
    };
  },
  components: {
    Buy,
  },
  computed: {
    ...mapState(["buy"]),
    itemP(): any {
      const id = Number(this.$route.params.id);
      const prod = this.item(id);
      if (!prod) return;
      return prod;
    },
    ...mapGetters("products", ["item"]),
  },
  methods: {
    ...mapMutations(["toBuy"]),
    async getProduct(id: number) {
      if (!id) return;
      this.product = await this.item(id);
    },
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
