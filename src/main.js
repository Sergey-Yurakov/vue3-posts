import { createApp } from "vue";
import App from "./App";
import components from "@/components/ui";

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

app.mount("#app");
