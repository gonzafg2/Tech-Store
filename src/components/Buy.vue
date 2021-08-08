<template>
  <v-row justify="center">
    <v-dialog v-model="buy" persistent max-width="600px">
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

    <v-dialog v-model="buying" hide-overlay persistent width="300">
      <v-card color="success" dark>
        <v-card-text>
          We process your order.
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <StandBy text="We process your order." />

    <v-dialog v-model="bought" hide-overlay persistent width="300">
      <v-card color="success" dark>
        <v-card-text class="buy"
          ><v-icon large>mdi-heart</v-icon>
          &nbsp;&nbsp;Thank you for your purchase!
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="white darken-1" text @click="successBuy()">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
// Libraries
import Vue from "vue";
import { mapState, mapMutations, mapActions } from "vuex";
// Components
import StandBy from "@/components/StandBy.vue";

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
  components: {
    StandBy,
  },
  computed: {
    id(): number {
      const id = this.$route.params.id;
      return Number(id);
    },
    ...mapState("general", ["buy", "buying", "bought"]),
  },
  methods: {
    ...mapMutations("general", ["toBuy", "setBought"]),
    ...mapActions("general", ["toBuyNow"]),
    buyNow(): void {
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
        id,
      };
      this.toBuyNow(client);
    },
    successBuy(): void {
      this.setBought(false);
      this.$router.push("/");
    },
  },
});
</script>

<style lang="scss" scoped>
.buy {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
  font-size: 18px;
  i {
    margin-bottom: 10px;
    margin-top: 30px;
  }
}
</style>
