import { dataAccess } from "@/types";

const mutations = {
  setToken(state: dataAccess, payload: dataAccess): void {
    state.email = payload && payload.email;
    state.id = payload && payload.id;
    state.name = payload && payload.name;
    state.token = payload && payload.token;

    // Save too in localstorage:
    const data = JSON.stringify(payload);
    localStorage.setItem("access", data);
  },
};
export default mutations;
