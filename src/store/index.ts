import Vue from "vue";
import Vuex from "vuex";
import access from "./access";
import products from "./products";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    access,
    products,
  },
});
