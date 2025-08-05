import { defineConfig } from "vitepress";
import tailwindcss from "@tailwindcss/vite";

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  lang: "zh-CN", // 语言配置，可选en-US
  base: "/doc-tailwindcss/",
  title: "Ciallo～(∠・ω< )⌒☆!", // 站点标题
  head: [["link", { rel: "icon", href: "./Logo.svg" }]], // 标签页图标
  titleTemplate: ":title | DtZNB's Blog",
  description: "DtZNB's Blog",
  vite: {
    plugins: [tailwindcss()],
  },
  themeConfig: {
    outlineTitle: "目录",
    // `'deep'` 与 `[2, 6]` 相同，将显示从 `<h2>` 到 `<h6>` 的所有标题。
    outline: [2, 6],
    logo: "/Logo.svg", // 导航栏logo
    siteTitle: "DtZNB's 个人知识库", // 导航栏中间的标题
    // 导航栏最多支持两层嵌套，请注意不要在第二层items使用生成函数
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/docs/markdown-examples" },
      { text: "开发工具", link: "/docs/开发工具/图床/使用Github和PicGo" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
