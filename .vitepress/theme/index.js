/* eslint-disable vue/one-component-per-file */
import { setup } from '@css-render/vue3-ssr';
import { NConfigProvider } from 'naive-ui';
import { useRoute } from 'vitepress';
import { defineComponent, h, inject } from 'vue';
import DefaultTheme from 'vitepress/theme-without-fonts';
// 自定义样式, 保证位于默认主题之后导入
import './custom.css';

// 导入动画组件
import { Motion } from 'motion-v';
import { MotionPlugin } from '@vueuse/motion';
import DocTextAnimation from './components/DocTextAnimation.vue';
import ShinyText from './components/animate/ShinyText.vue';
import CurvedLoop from './components/animate/CurvedLoop.vue';
import FuzzyText from './components/animate/FuzzyText.vue';
import SquaresMove from './components/animate/SquaresMove.vue';
import PixelCard from './components/animate/PixelCard.vue';

// 导入自定义组件
import LinkCard from './components/LinkCard.vue';
// import { Icon } from '@iconify/vue';
import 'iconify-icon';

// 导入布局组件
import BlogLayout from './layouts/BlogLayout.vue';
import MyCustomLayout from './layouts/MyCustomLayout.vue';
import EnhancedArticlesList from './components/EnhancedArticlesList.vue';

// naive-ui 配置
const { Layout } = DefaultTheme;

const CssRenderStyle = defineComponent({
  setup() {
    const collect = inject('css-render-collect');
    return {
      style: collect(),
    };
  },
  render() {
    return h('css-render-style', {
      innerHTML: this.style,
    });
  },
});

const VitepressPath = defineComponent({
  setup() {
    const route = useRoute();
    return () => {
      return h('vitepress-path', null, [route.path]);
    };
  },
});

const NaiveUIProvider = defineComponent({
  render() {
    return h(
      NConfigProvider,
      { abstract: true, inlineThemeDisabled: true },
      {
        default: () => [
          h(Layout, null, { default: this.$slots.default?.() }),
          import.meta.env.SSR ? [h(CssRenderStyle), h(VitepressPath)] : null,
        ],
      }
    );
  },
});

export default {
  extends: DefaultTheme,
  // ...DefaultTheme, //或者这样写也可

  // naive-ui 配置
  Layout: NaiveUIProvider,
  enhanceApp: ({ app }) => {
    if (import.meta.env.SSR) {
      const { collect } = setup(app);
      app.provide('css-render-collect', collect);
    }
  },
  // vitepress插槽
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
    app.component('ShinyText', ShinyText);
    app.component('CurvedLoop', CurvedLoop);
    app.component('FuzzyText', FuzzyText);
    app.component('SquaresMove', SquaresMove);
    app.component('PixelCard', PixelCard);
    app.use(MotionPlugin);
    // 注册Iconify组件
    // app.component('Icon', Icon);
  },
};
