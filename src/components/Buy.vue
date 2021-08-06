<template>
  <v-row justify="center">
    <v-dialog v-model="buyProduct" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">We need some data:</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="name"
                  label="Your full name*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="email"
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.number="quantity"
                  label="Quantity*"
                  required
                  type="number"
                  min="1"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="phone"
                  label="Phone*"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="toBuy(false)">Close</v-btn>
          <v-btn
            color="blue darken-1"
            text
            :disabled="!name || !email || !phone || !quantity || !id"
            @click="buyNow"
            >Buy</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
// Libraries
import Vue from "vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default Vue.extend({
  name: "Buy",
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      quantity: "",
    };
  },
  computed: {
    ...mapState(["buy"]),
    // buyProduct: {
    //   get() {
    //     return this.buy;
    //   },
    //   set(val) {
    //     this.toBuy(val);
    //   },
    // },
    id(): number {
      const id = this.$route.params.id;
      return Number(id);
    },
  },
  methods: {
    ...mapMutations(["toBuy"]),
    ...mapActions(["toBuyNow"]),
    buyNow() {
      const name = this.name;
      const email = this.email;
      const phone = this.phone;
      const quantity = this.quantity;
      const id = this.id;
      if (!name || !email || !phone || !quantity || !id) return;
      const client = {
        name,
        email,
        phone,
        quantity,
        id
      };
      this.toBuyNow(client);
    },
  },
});
</script>
