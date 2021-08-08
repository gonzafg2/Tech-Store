import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  const isAuthenticated: boolean = store.state.access.login;

  if (to.name === "Home") next();
  else if (to.name === "Admin" && isAuthenticated) next();
  else if (to.name === "Admin" && !isAuthenticated) next({ name: "Home" });
  else if (to.name !== "Admin") next();
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
