<template>
  <v-row justify="center">
    <v-dialog v-model="loginModal" persistent max-width="400px">
      <v-card elevation="2" class="pa-4">
        <v-card-title class="flex justify-center">
          <span class="text-h5">Login</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="user.email"
            prepend-inner-icon="mdi-mail"
            label="Email"
            required
            clearable
            :rules="[(value) => regExEmail.test(value) || 'Invalid e-mail.']"
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            prepend-inner-icon="mdi-key"
            label="Password"
            type="password"
            clearable
            :rules="[(value) => value.length > 3 || 'Invalid password.']"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="setLoginModal(false)">
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="loginNow"
            :disabled="!user.email || !regExEmail.test(user.email) || !user.password || user.password && user.password.length < 4"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <StandBy />
  </v-row>
</template>

<script lang="ts">
// Libraries
import Vue from "vue";
import { mapState, mapMutations, mapActions } from "vuex";
// Components
import StandBy from "@/components/StandBy.vue";

export default Vue.extend({
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      regExEmail:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    };
  },
  components: {
    StandBy,
  },
  computed: {
    ...mapState("access", ["loginModal"]),
  },
  methods: {
    ...mapMutations("access", ["setLoginModal"]),
    ...mapActions("access", ["login"]),
    async loginNow(): Promise<void> {
      const user = this.user;
      if (!user) return;
      await this.login(user);
      this.clearData();
    },
    clearData(): void {
      this.user = {
        email: "",
        password: "",
      }
    }
  },
});
</script>
