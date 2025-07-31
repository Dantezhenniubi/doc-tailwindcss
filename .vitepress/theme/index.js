import "./tailwind.css";
import DefaultTheme from "vitepress/theme";
import Linkcard from "./components/Linkcard.vue";


export default {
  extends: DefaultTheme,
  // ...DefaultTheme, //或者这样写也可
  enhanceApp({ app }) {
    // 注册全局组件
    app.component("Linkcard", Linkcard);
  },
};
