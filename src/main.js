import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import BootstrapVue from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

import { store } from "./Datastore";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
