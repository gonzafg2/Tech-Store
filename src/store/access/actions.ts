import axios from "axios";
import { dataAccess, dataLogin, dataAPIAccess } from "@/types";

const actions = {
  async getToken({ commit }: any): Promise<void> {
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
    } catch (e) {
      console.error(`Error de acceso a la API: \n ${e}`);

      // Backup Access data:
      const dataRaw: string | null = localStorage.getItem("access");
      if (!dataRaw) return;
      const data: dataAccess = JSON.parse(dataRaw);
      commit("setToken", data);
    }
  },
};
export default actions;
