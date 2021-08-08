import axios from "axios";
import { dataItemsDetails } from "@/types";

const actions = {
  async toBuyNow({ rootState, commit }: any, payload: any): Promise<void> {
    // Initialize modal for procesing:
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
        commit("products/setBuy", dataBuy, { root: true });
        commit("setBuying", false);
        commit("setBought", true);
      }
    } catch (e) {
      `Error de acceso a la API en actualizar item: \n ${e}`;
    }
  },
};
export default actions;
