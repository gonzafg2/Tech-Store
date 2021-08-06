import axios from "axios";
import { dataCategories } from "@/types";

const actions = {
  async getCategories({ rootState, commit }: any) {
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
      const req = await axios.get(`${urlBase}/categories`, config);
      const data: [dataCategories] = req.data;
      commit("setCategories", data);
    } catch (e) {
      console.error(`Error de acceso a la API en acceso de categories: \n ${e}`);
    }
  },
};
export default actions;
