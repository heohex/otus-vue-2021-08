import { createApp } from "vue";
import antd from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.dark.less";

const app = createApp(App);

app.use(store).use(router).use(antd).mount("#app");
