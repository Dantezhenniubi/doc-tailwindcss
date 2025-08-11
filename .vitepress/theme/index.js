// import "./tailwind.css";
import "./custom.css";
import DefaultTheme from "vitepress/theme";
import Linkcard from "./components/Linkcard.vue";
// import { Icon } from '@iconify/vue';
import 'iconify-icon';


export default {
  extends: DefaultTheme,
  // ...DefaultTheme, //或者这样写也可
  enhanceApp({ app }) {
    // 注册全局组件
    app.component("Linkcard", Linkcard);
    // 注册Iconify组件
    // app.component('Icon', Icon);
  },
};
