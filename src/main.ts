import { createApp } from "vue";
import "./style.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "@/mock/index";
import "./router/guards";
import "@/assets/iconfont/iconfont.css";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import permission from "./directives/permission";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.directive("permission", permission)
const pinia = createPinia();
app.use(pinia);
app.use(ElementPlus);
app.use(router);
app.mount("#app");
