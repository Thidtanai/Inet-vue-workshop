import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

import "ant-design-vue/dist/antd.esm";
import Antd from "ant-design-vue";
import VueCookies from "vue-cookies";

import axios from "axios";
import VueAxios from "vue-axios";

import { createPinia } from "pinia";
const pinia = createPinia();

// createApp(App).use(router, Antd).mount("#app");
const app = createApp(App);
app.use(router);
app.use(Antd);
app.use(VueCookies, { expires: "7d" });
app.use(VueAxios, axios);
app.use(pinia);
app.mount("#app");
