import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import store from "./store/Store";

createApp(App).use(store).mount("#app");
store.dispatch("getAllCompanies");
