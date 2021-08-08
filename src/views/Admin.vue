<template>
  <div class="admin py-5 mb-10">
    <h1 class="admin__title">Administrator's Panel</h1>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__title {
    display: flex;
    justify-content: center;
    margin: 20px 0;
    text-align: center;
  }
}
</style>
