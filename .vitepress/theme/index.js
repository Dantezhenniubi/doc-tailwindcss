// import "./tailwind.css";
import { h } from 'vue';
import DefaultTheme from 'vitepress/theme-without-fonts';
// 自定义样式, 保证位于默认主题之后导入
import './custom.css';
import 'element-plus/dist/index.css';

// 导入动画组件
import { Motion } from 'motion-v';
import { MotionPlugin } from '@vueuse/motion';
import DocTextAnimation from './components/DocTextAnimation.vue';

// 导入自定义组件
import LinkCard from './components/LinkCard.vue';
// import { Icon } from '@iconify/vue';
import 'iconify-icon';

// 导入布局组件
import BlogLayout from './layouts/BlogLayout.vue';
import MyCustomLayout from './layouts/MyCustomLayout.vue';
import EnhancedArticlesList from './components/EnhancedArticlesList.vue';

export default {
  extends: DefaultTheme,
  // ...DefaultTheme, //或者这样写也可
  // 插槽
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-after': () => h(DocTextAnimation), // 文章动画
    });
  },
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('LinkCard', LinkCard);
    app.component('MotionComponent', Motion);
    app.component('BlogLayout', BlogLayout);
    app.component('MyCustomLayout', MyCustomLayout);
    app.component('EnhancedArticlesList', EnhancedArticlesList);
    app.use(MotionPlugin);
    // 注册Iconify组件
    // app.component('Icon', Icon);
  },
};
