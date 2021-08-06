import Vue from "vue";
import Vuex from "vuex";
import access from "./access";
import products from "./products";
import categories from "./categories";

import axios from "axios";

import { dataItemsDetails } from "@/types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: true,
    loading2: false,
    buy: false,
    client: {
      name: "",
      email: "",
      phone: "",
      quantity: null,
      id: null,
    },
  },
  mutations: {
    setLoading(state, payload): void {
      state.loading = payload;
    },
    toBuy(state, payload): void {
      state.buy = payload;
    },
    setBuyNow(state, payload): void {
      state.client = payload.client;
      state.buy = false;
      alert("Thank you so much!");
    },
  },
  actions: {
    async toBuyNow({ rootState, commit }: any, payload: any): Promise<void> {
      const urlBase = "https://pt.arriagada.dev/api";
      const token = rootState.access.token;
      const items = rootState.products.items;
      const item = items.find((item: dataItemsDetails, i: number) => {
        item.index = i;
        return item.id === payload.id;
      });

      const qty = item.quantity - payload.quantity;

      item.quantity = qty;
      item.status = Number(item.status);

      const itemAPI = item;
      delete itemAPI.index;

      const dataBuy = {
        item,
        client: payload,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + token,
        },
        body: itemAPI,
      };

      // api
      try {
        // const req = await axios.put(`${urlBase}/item`, config);
        // console.log(req);
      } catch (error) {
        console.error(error);
      } finally {
        // Vuex
        commit("setBuyNow", dataBuy);
        commit("products/setBuy", dataBuy);
      }
    },
  },
  modules: {
    access,
    products,
    categories,
  },
});
