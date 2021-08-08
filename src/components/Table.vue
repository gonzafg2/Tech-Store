<template>
  <v-container>
    <v-row justify="center" align="center" class="mt-5">
      <v-col cols="12" md="3">
        <v-select
          v-model="category"
          :items="categories"
          item-text="name"
          item-value="id"
          label="Category:"
          persistent-hint
          return-object
          hint="Please select a product category:"
        ></v-select>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn style="color: white" color="red" @click="resetFilter" :disabled="!category.id"
          >Clear filter</v-btn
        >
      </v-col>

      <v-col cols="12" lg="11">
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="filter"
          :search="search"
          sort-by="id"
          class="elevation-5"
          v-if="itemsAll"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-spacer></v-spacer>

              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    fab
                    dark
                    small
                    push
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    :loading="dialog"
                  >
                    <v-icon> mdi-plus </v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.name"
                            label="Name"
                            clearable
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model.number="editedItem.quantity"
                            label="Quantity"
                            min="0"
                            clearable
                            :rules="[
                              (value) =>
                                /^\d+$/.test(value) || 'Must be a number',
                            ]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model.number="editedItem.priceTaxExcluded"
                            label="Price"
                            min="0"
                            type="number"
                            prefix="$"
                            clearable
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-select
                            v-model="editedItem.categoryId"
                            :items="categories"
                            item-text="name"
                            item-value="id"
                            label="Category:"
                            persistent-hint
                            clearable
                            hint="Please select a product category..."
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-select
                            v-model="editedItem.status"
                            :items="status"
                            item-text="name"
                            item-value="id"
                            label="Status:"
                            persistent-hint
                            clearable
                            hint="Please select a product status..."
                          ></v-select>
                        </v-col>
                        <v-col cols="12">
                          <v-textarea
                            v-model="editedItem.description"
                            label="Description"
                            auto-grow
                            rows="3"
                            hint="Please type a product description..."
                            clearable
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      :disabled="
                        !editedItem.name ||
                        !editedItem.description ||
                        !editedItem.priceTaxExcluded ||
                        !editedItem.status ||
                        !editedItem.quantity ||
                        !editedItem.categoryId
                      "
                      text
                      @click="save"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h6"
                    >Are you sure you want to delete this item?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <!-- eslint-disable-next-line -->
          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon color="red" @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
          <template v-slot:no-data>
            <p class="mt-4">No available data</p>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Libraries
import Vue from "vue";
import { mapState, mapActions } from "vuex";
// Types
// import { dataItemsDetails } from "@/types";

export default Vue.extend({
  name: "Table",
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      search: "",
      editedIndex: -1,
      editedItem: {
        name: "",
        quantity: null,
        priceTaxExcluded: null,
        description: "",
        categoryId: null,
        status: null,
      },
      defaultItem: {
        name: "",
        quantity: null,
        priceTaxExcluded: null,
        description: "",
        categoryId: null,
        status: null,
      },
      category: { id: null, name: "" },
      itemToDelete: null,
    };
  },
  computed: {
    formTitle: function () {
      const edit = this.editedIndex;
      if (edit === -1) return "New Product";
      return "Edit Product";
    },
    ...mapState("categories", ["categories"]),
    ...mapState("products", ["itemsAll", "headers", "status"]),
    filter() {
      const categories = this.category;
      const items = this.itemsAll;
      if (!categories.id) return items;

      const fil = items.filter((item) => item.categoryId === categories.id);
      return fil.length > 0 ? fil : [];
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    ...mapActions("products", ["deleteProduct", "createProduct", "updateProduct"]),
    editItem(item) {
      this.editedIndex = this.itemsAll.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.itemToDelete = item;
      this.editedIndex = this.itemsAll.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      await this.deleteProduct(this.itemToDelete);
      this.itemsAll.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async save() {
      if (this.editedIndex > -1) {
        await this.updateProduct(this.editedItem);
        Object.assign(this.itemsAll[this.editedIndex], this.editedItem);
      } else {
        await this.createProduct(this.editedItem);
        this.itemsAll.push(this.editedItem);
      }
      this.close();
    },
    resetFilter() {
      this.category = { id: null, name: "" };
    },
  },
});
</script>
