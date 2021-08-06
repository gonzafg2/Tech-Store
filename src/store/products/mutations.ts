import { dataItems, dataItemsDetails } from "@/types";

const mutations = {
  setItems(state: any, payload: [dataItems]): void {
    if (!state.items || !payload) return;
    state.items = payload;
  },
  setItemsDetails(state: any, payload: dataItemsDetails): void {
    if (!state.items || !payload) return;

    const propToAdd = {
      description: payload.description || "",
      categoryId: Number(payload.categoryId) || null,
      priceTaxExcluded: payload.priceTaxExcluded || null,
    };

    let item: dataItems = state.items.find(
      (item: dataItems) => item.id === payload.id
    );
    item = { ...item, ...propToAdd };
    state.items[payload.index] = item;
  },
  setBuy(
    state: { items: { [x: string]: any } },
    payload: { item: { index: string | number } }
  ): void {
    state.items[payload.item.index] = payload.item;
  },
};
export default mutations;
