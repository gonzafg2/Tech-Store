import { dataItems } from "@/types";

const getters = {
  activeItems(state: any) {
    const items = state.items;
    
    if (!items || !items.length) return [];
    const active = items.filter((fil: dataItems) => fil && fil.status === "1");
    return active ? active : [];
  },
};
export default getters;
