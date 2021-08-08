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

    items.forEach(async (item: dataItems) => {
      if (!item || !item.id) return;

      try {
        const req = await axios.get(`${urlBase}/item/${item.id}`, config);
        if (!req || !req.data) return;
        const data: dataItemsDetails = req.data;
        await commit("setItemsDetails", data);
      } catch (e) {
        console.error(
          `Error de acceso a la API en acceso de items detalle: \n ${e}`
        );
      } finally {
        commit("general/setLoading", false, { root: true });
      }
    });
  },
  async deleteProduct({ rootState, commit }: any, payload: any) {
    commit("general/setStandBy", true, { root: true });
    const urlBase = "https://pt.arriagada.dev/api";
    const token = rootState.access.token;
    const item = payload;

    const config = {
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + token,
      },
    };

    try {
      await axios.delete(`${urlBase}/item/${item.id}`, config);
      commit("setDeleted", item);
    } catch (e) {
      console.error(`Error de acceso a la API en eliminar item: \n ${e}`);
    } finally {
      commit("general/setStandBy", false, { root: true });
    }
  },
  async createProduct({ rootState, commit }: any, payload: any) {
    commit("general/setStandBy", true, { root: true });
    const urlBase = "https://pt.arriagada.dev/api";
    const token = rootState.access.token;
    const item = payload;

    const config = {
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + token,
      },
      body: item,
    };

    try {
      await axios.post(`${urlBase}/item`, item, config);
    } catch (e) {
      `Error de acceso a la API en crear item: \n ${e}`;
    } finally {
      commit("general/setStandBy", false, { root: true });
    }
  },
  async updateProduct({ rootState, commit }: any, payload: any) {
    commit("general/setStandBy", true, { root: true });
    const urlBase = "https://pt.arriagada.dev/api";
    const token = rootState.access.token;
    const item = payload;

    const config = {
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + token,
      },
      body: item,
    };

    try {
      await axios.put(`${urlBase}/item`, item, config);
    } catch (e) {
      `Error de acceso a la API en actualizar item: \n ${e}`;
    } finally {
      commit("general/setStandBy", false, { root: true });
    }
  },
};
export default actions;
