import axios from "axios";
import { dataAccess, dataLogin, dataAPIAccess } from "@/types";

const actions = {
  async getToken({ commit }: any): Promise<void> {
    // Is token saved in locastorage?
    const dataRaw: string | null = localStorage.getItem("access");
    if (dataRaw) {
      const data: dataAccess = JSON.parse(dataRaw);
      commit("setToken", data);
      return;
    }

    // Is not:
    const urlBase = "https://pt.arriagada.dev/api";
    const email = "demo@demo.cl";
    const password = "demo";

    const data: dataLogin = {
      email,
      password,
    };

    try {
      const req = await axios.post(`${urlBase}/login`, data);
      if (!req) return;
      const dataRaw: dataAPIAccess = req.data;

      const dataSave: dataAccess = {
        token: dataRaw.access_token,
        email: dataRaw.user && dataRaw.user.email,
        name: dataRaw.user && dataRaw.user.name,
        id: dataRaw.user && dataRaw.user.id,
      };
      commit("setToken", dataSave);
      // Save too in localstorage:
      localStorage.setItem("access", JSON.stringify(dataSave));
    } catch (e) {
      console.error(`Error de acceso a la API: \n ${e}`);
    }
  },
};
export default actions;
