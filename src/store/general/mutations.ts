const mutations = {
  setLoading(state: any, payload: any): void {
    state.loading = payload;
  },
  toBuy(state: any, payload: any): void {
    state.buy = payload;
  },
  setBuying(state: any, payload: any): void {
    state.buying = payload;
  },
  setBought(state: any, payload: any): void {
    state.bought = payload;
  },
  setBuyNow(state: any, payload: any): void {
    state.client = payload.client;
    state.buy = false;
  },
};
export default mutations;
