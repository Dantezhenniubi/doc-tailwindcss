// import "./tailwind.css";
import { h } from 'vue';
import DefaultTheme from 'vitepress/theme-without-fonts';
// 自定义样式, 保证位于默认主题之后导入
import './custom.css';
import Linkcard from './components/Linkcard.vue';
// import { Icon } from '@iconify/vue';
import 'iconify-icon';

export default {
  extends: DefaultTheme,
  // ...DefaultTheme, //或者这样写也可
  // 插槽
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('Linkcard', Linkcard);
    // 注册Iconify组件
    // app.component('Icon', Icon);
  },
};
