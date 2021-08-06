import axios from "axios";
import { dataItems, dataItemsDetails } from "@/types";

const actions = {
  async getItems({ rootState, commit }: any) {
    const urlBase = "https://pt.arriagada.dev/api";
    const token = rootState.access.token;

    const config = {
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + token,
      },
    };

    try {
      const req = await axios.get(`${urlBase}/items`, config);
      const data: [dataItems] = req.data.data;
      commit("setItems", data);
    } catch (e) {
      console.error(`Error de acceso a la API en acceso de items: \n ${e}`);
    }
  },
  async getItemsDetails({ rootState, commit }: any) {
    const urlBase = "https://pt.arriagada.dev/api";
    const token = rootState.access.token;
    const items = rootState.products.items;

    const config = {
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + token,
      },
    };
    if (!items) return;

    const itemsAll = items.map(async (item: dataItems, i: number) => {
      if (!item || !item.id) return;

      try {
        const req = await axios.get(`${urlBase}/item/${item.id}`, config);
        if (!req || !req.data) return;
        const data: dataItemsDetails = req.data;
        data.index = i;
        commit("setItemsDetails", data);
      } catch (e) {
        console.error(
          `Error de acceso a la API en acceso de items detalle: \n ${e}`
        );
      } finally {
        commit("setLoading", null, { root: true });
      }
    });
  },
};
export default actions;
