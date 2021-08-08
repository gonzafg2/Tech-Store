<template>
  <v-row justify="center">
    <v-dialog v-model="loginModal" persistent max-width="600px">

      <v-card>
        <v-card-title class="flex justify-center">
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row class="justify-center">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="user.email"
                  prepend-inner-icon="mdi-mail"
                  label="Email"
                  required
                  clearable
                  :rules="[
                    (value) => regExEmail.test(value) || 'Invalid e-mail.',
                  ]"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="justify-center">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="user.password"
                  prepend-inner-icon="mdi-key"
                  label="Password"
                  type="password"
                  clearable
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
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
            :disabled="!user.email || !user.password"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapMutations, mapActions } from "vuex";

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
  computed: {
    ...mapState("access", ["loginModal"]),
  },
  methods: {
    ...mapMutations("access", ["setLoginModal", "login"]),
    ...mapActions("access", ["login"]),
    async loginNow(): Promise<void> {
      const user = this.user;
      if (!user) return;
      this.login(user);
    },
  },
});
</script>
