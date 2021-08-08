import { dataItems, dataItemsDetails } from "@/types";

const mutations = {
  setItems(state: any, payload: [dataItems]): void {
    if (!state.items || !payload) return;
    state.items = payload;
  },
  setItemsDetails(state: any, payload: dataItemsDetails): void {
    if (!state.items || !payload) return;

    const item = {
      id: payload.id,
      name: payload.name,
      quantity: payload.quantity,
      status: payload.status,
      description: payload.description || "",
      categoryId: Number(payload.categoryId) || null,
      priceTaxExcluded: payload.priceTaxExcluded || null,
    };
    state.itemsAll.push(item);
  },
  setBuy(
    state: { items: { [x: string]: any } },
    payload: { item: { index: string | number } }
  ): void {
    state.items[payload.item.index] = payload.item;
  },
};
export default mutations;
