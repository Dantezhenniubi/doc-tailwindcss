/* eslint-disable vue/one-component-per-file */
/* eslint-disable vue/multi-word-component-names */
/* eslint-disable vue/component-definition-name-casing */
import { setup } from '@css-render/vue3-ssr';
import { NConfigProvider } from 'naive-ui';
import { useRoute } from 'vitepress';
import { defineComponent, h, inject } from 'vue';
import DefaultTheme from 'vitepress/theme-without-fonts';
// 自定义样式, 保证位于默认主题之后导入
import './custom.css';
// 引入ElementPlus中文语言包
import ElementPlus from 'element-plus';
import zhLocale from '../locale/zh';
// 引入ElementPlus全局样式
import 'element-plus/dist/index.css';

// 导入动画组件
import { Motion } from 'motion-v';
import { MotionPlugin } from '@vueuse/motion';
import DocTextAnimation from './components/DocTextAnimation.vue';
import ShinyText from './components/animate/ShinyText.vue';
import CurvedLoop from './components/animate/CurvedLoop.vue';
import FuzzyText from './components/animate/FuzzyText.vue';
import SquaresMove from './components/animate/SquaresMove.vue';
import PixelCard from './components/animate/PixelCard.vue';
import CircularText from './components/animate/CircularText.vue';
import GlassSurface from './components/animate/GlassSurface.vue';
import TrueFocus from './components/animate/TrueFocus.vue';
import TextType from './components/animate/TextType.vue';

// 导入自定义组件
import LinkCard from './components/LinkCard.vue';
import { Icon } from '@iconify/vue';
import 'iconify-icon';
import BackTop from './components/BackTop.vue';
import HighlightStrong from './components/HighlightStrong.vue';

// 引入时间线样式
import 'vitepress-markdown-timeline/dist/theme/index.css';
// 引入代码演示块
import DemoBlock from '@ruabick/vitepress-demo-block';
import '@ruabick/vitepress-demo-block/dist/style.css';
// 引入表格点击复制
import { copyTableCellOnDoubleClick } from '../utils/copyTableCell';
// 引入路由加载进度条
import '@bprogress/core/css';
import { BProgress } from '@bprogress/core';

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
      // app.provide('css-render-collect', collect);
      app.provide('css-render-collect', () => {
        const styleText = collect();
        // 手动塞进 <head> 最前面
        useHead({
          style: [{ children: styleText, type: 'text/css' }],
        });
        return '';
      });
    }
  },
  // vitepress插槽
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-after': () => h(DocTextAnimation), // 文章动画
      'doc-top': () => h(BackTop), // 返回顶部
      'doc-before': () => h(HighlightStrong), // 文章动画
    });
  },
  enhanceApp({ app, router }) {
    // 双击表格单元格复制功能(只在客户端执行)
    if (typeof window !== 'undefined') {
      // 等待DOM加载完成后启用功能
      window.addEventListener('DOMContentLoaded', () => {
        copyTableCellOnDoubleClick();
      });
    }
    // 进度条插件
    if (typeof window !== 'undefined') {
      BProgress.configure({
        start: () => {
          router.onBeforeRouteChange = () => {
            BProgress.start(); // 开始进度条
          };
        },
        done: () => {
          router.onAfterRouteChanged = () => {
            BProgress.done(); // 停止进度条
          };
        },
      });
    }
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
    app.component('CircularText', CircularText);
    app.component('GlassSurface', GlassSurface);
    app.component('TrueFocus', TrueFocus);
    app.component('TextType', TextType);
    app.component('PixelCard', PixelCard);
    app.use(MotionPlugin);
    // 代码演示块
    app.component('demo', DemoBlock);
    // 注册Iconify组件
    app.component('Icon', Icon);
    app.use(ElementPlus, { locale: zhLocale });
  },
};
