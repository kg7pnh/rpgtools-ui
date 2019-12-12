import "core-js/es6/promise";
import "core-js/es6/string";
import "core-js/es7/array";

import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "./App.vue";
import router from "./router/index";
import Toastr from "vue-toastr";
import VuejsDialog from "vuejs-dialog";
import VueEasyCm from "vue-easycm";
import VueFormWizard from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import InputTag from "vue-input-tag";

require("vue-toastr/src/vue-toastr.scss");
require("vuejs-dialog/dist/vuejs-dialog.min.css");

Vue.use(BootstrapVue);
Vue.use(Toastr, {
  defaultTimeout: 3000,
  defaultProgressBar: false,
  defaultProgressBarValue: 0,
  defaultType: "error",
  defaultPosition: "toast-bottom-right",
  defaultCloseOnHover: false
});
Vue.use(VueFormWizard);
Vue.use(VuejsDialog);
Vue.use(VueEasyCm);
Vue.use(require("vue-moment"));
Vue.config.productionTip = false;
Vue.component("input-tag", InputTag);

import { store } from "./Datastore";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
