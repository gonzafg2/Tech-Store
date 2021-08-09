import axios from "axios";
import router from "../../router";
import { dataAccess, dataLogin, dataAPIAccess } from "@/types";

function setSessionCookie(name: string, value: string, days: number): void {
  const now = new Date();
  now.setTime(now.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + now.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
function deleteSessionCookie(name: string): void {
  const expires = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie = name + "=" + ";" + expires + ";path=/";
}

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
  async login({ commit }: any, payload: dataLogin): Promise<void> {
    commit("setLoginModal", false);
    commit("general/setStandBy", true, { root: true });

    const user = payload;
    const email = "demo@demo.cl";
    const password = "demo";

    setTimeout(() => {
      if (email === user.email && password === user.password) {
        commit("setLogin", true);
        commit("general/setStandBy", false, { root: true });
        // Cookie de sesión:
        setSessionCookie("isLogged", "logged", 1);
        router.push("/admin");
        return;
      }
      commit("general/setStandBy", false, { root: true });
      commit("setLoginModal", true);
      return;
    }, 1000);
  },
  async logout({ commit }: any): Promise<void> {
    commit("general/setStandBy", true, { root: true });
    setTimeout(() => {
      commit("setLogin", false);
      commit("general/setStandBy", false, { root: true });
      // Cookie de sesión:
      deleteSessionCookie("isLogged");
      if (router.currentRoute.name !== "Home") router.push("/");
    }, 1000);
  },
};
export default actions;
