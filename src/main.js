import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueMeta from "vue-meta";
Vue.use(VueMeta);
import "@/assets/scss/main.scss";
import { global } from "@/mixin/global.js";
Vue.mixin(global);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
