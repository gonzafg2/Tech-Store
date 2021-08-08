<template>
  <div class="text-center">
    <v-dialog v-model="isStandBy" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          {{ text }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
// Libraries
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "StandBy",
  props: {
    text: {
      type: String,
      default: "Please stand by...",
    },
  },
  computed: {
    ...mapState("general", ["isStandBy"]),
  },
});
</script>
