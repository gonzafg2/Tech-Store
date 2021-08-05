<template>
  <div class="admin pt-5">
    <Table />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Table from "@/components/Table.vue";

export default Vue.extend({
  name: "Admin",
  components: {
    Table,
  },
});
</script>

<style lang="scss" scoped>
.admin {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
