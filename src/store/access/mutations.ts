import { dataAccess } from "@/types";

const mutations = {
  setToken(state: dataAccess, payload: dataAccess): void {
    state.email = payload && payload.email;
    state.id = payload && payload.id;
    state.name = payload && payload.name;
    state.token = payload && payload.token;
  },
  setLoginModal(state: any, payload: boolean): void {
    state.loginModal = payload;
  },
  setLogin(state: any, payload: boolean): void {
    state.login = payload;
  },
};
export default mutations;
