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
    buying: false,
    bought: false,
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
    setBuying(state, payload): void {
      state.buying = payload;
    },
    setBought(state, payload): void {
      state.bought = payload;
    },
    setBuyNow(state, payload): void {
      state.client = payload.client;
      state.buy = false;
    },
  },
  actions: {
    async toBuyNow({ rootState, commit }: any, payload: any): Promise<void> {
      // Initialize modal for procesin:
      commit("setBuying", true);

      const urlBase = "https://pt.arriagada.dev/api";
      const token = rootState.access.token;
      const items = rootState.products.itemsAll;
      const item = items.find(
        (item: dataItemsDetails, i: number) => item.id === payload.id
      );

      item.quantity = item.quantity - payload.quantity;

      const itemAPI = item;
      delete itemAPI.index;

      const dataBuy = {
        item,
        client: payload,
      };

      const config = {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + token,
        },
        body: itemAPI,
      };

      // api
      try {
        const buy = await axios.put(`${urlBase}/item`, itemAPI, config);
        if (buy.status === 200) {
          commit("setBuyNow", dataBuy);
          commit("products/setBuy", dataBuy);
          commit("setBuying", false);
          commit("setBought", true);
        }
      } catch (e) {
        `Error de acceso a la API en actualizar item: \n ${e}`;
      }
    },
  },
  modules: {
    access,
    products,
    categories,
  },
});
