import { dataItems, dataItemsDetails } from "@/types";

const mutations = {
  setItems(state: any, payload: [dataItems]) {
    if (!state.items || !payload) return;
    state.items = payload;
  },
  setItemsDetails(state: any, payload: dataItemsDetails) {
    if (!state.items || !payload) return;

    const propToAdd = {
      description: payload.description || "",
      categoryId: payload.categoryId || null,
      priceTaxExcluded: payload.priceTaxExcluded || null,
    };

    
    let item: dataItems = state.items.find((item: dataItems) => item.id === payload.id);
    item = { ...item, ...propToAdd };
    state.items[payload.index] = item;
  },
};
export default mutations;
