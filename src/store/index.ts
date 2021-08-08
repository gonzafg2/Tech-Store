import Vue from "vue";
import Vuex from "vuex";
import access from "./access";
import products from "./products";
import categories from "./categories";
import general from "./general";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    access,
    products,
    categories,
    general,
  },
});
