import axios from "axios";
import { dataItems } from "@/types";

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
};
export default actions;
