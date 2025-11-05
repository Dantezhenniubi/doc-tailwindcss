// VitePress配置文件示例 (config.mjs)
import { defineConfig } from 'vitepress';

export default defineConfig({
  // 站点级别配置
  lang: 'zh-CN',
  title: '我的文档站点',
  description: '使用VitePress构建的文档站点',
  base: '/',
  lastUpdated: true,

  // 主题配置
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: 'API', link: '/api/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '介绍',
          items: [
            { text: '什么是VitePress', link: '/guide/what-is-vitepress' },
            { text: '快速开始', link: '/guide/getting-started' },
          ],
        },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
    footer: {
      message: '基于MIT许可发布',
      copyright: 'Copyright © 2023-present My Project',
    },
  },

  // Markdown配置 - 基于我们刚刚翻译的类型声明文件
  markdown: {
    // 语法高亮配置
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    // 在代码块中显示行号
    lineNumbers: true,
    // 代码块复制按钮文本
    codeCopyButtonTitle: '复制代码',
    // 默认高亮语言
    defaultHighlightLang: 'javascript',

    // 锚点配置
    anchor: {
      permalink: true,
      permalinkBefore: true,
      permalinkSymbol: '#',
    },

    // 表情符号配置
    emoji: {
      shortcuts: {
        smile: ['😄'],
        laughing: ['😆'],
      },
    },

    // 目录配置
    toc: {
      level: [2, 3, 4],
      includeLevel: [2, 3],
    },

    // 容器配置
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息',
    },

    // 数学公式支持
    math: true,

    // GitHub风格的警告
    gfmAlerts: true,

    // 图片配置
    image: {
      // 懒加载图片
      lazyLoading: true,
    },

    // 自定义Markdown实例配置
    // config: (md) => {
    // 这里可以添加自定义的markdown-it插件
    // 例如：md.use(require('markdown-it-plugin-name'))
    // },
  },

  // 站点级别钩子
  transformHead: ({ head }) => {
    head.push(['meta', { name: 'keywords', content: 'vitepress, vue, markdown, 文档' }]);
  },

  // 自定义目录结构
  srcDir: './docs',
  outDir: './dist',

  // 开发服务器配置
  vite: {
    server: {
      port: 3000,
      open: true,
    },
    // 其他Vite配置
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: 1000,
    },
  },
});
