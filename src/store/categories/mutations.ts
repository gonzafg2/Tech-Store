import { dataCategories } from "@/types";

const mutations = {
  setCategories(state: any, payload: [dataCategories]): void {
    if (!state.categories || !payload) return;
    state.categories = payload;
  },
};
export default mutations;
