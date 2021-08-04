import { dataItems } from "@/types";

const mutations = {
  setItems(state: any, payload: [dataItems]) {
    state.items = payload;
  },
};
export default mutations;
