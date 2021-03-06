import { dataItems } from "@/types";

const getters = {
  activeItems(state: any) {
    const items = state.itemsAll;
    if (!items || !items.length) return [];
    const active = items.filter((fil: dataItems) => fil && fil.status === "1");
    return active ? active : [];
  },
  item(state: any) {
    return (id: number) => {
      const items = state.itemsAll;
      const item = items.find((item: dataItems) => item && item.id === id);
      return item;
    }
  }
};
export default getters;
