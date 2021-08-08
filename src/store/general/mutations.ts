const mutations = {
  setLoading(state: any, payload: any): void {
    state.loading = payload;
  },
  toBuy(state: any, payload: any): void {
    state.buy = payload;
  },
  setStandBy(state: any, payload: any): void {
    state.isStandBy = payload;
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
