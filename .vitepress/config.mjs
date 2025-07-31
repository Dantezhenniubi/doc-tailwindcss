import { defineConfig } from "vitepress";
import tailwindcss from "@tailwindcss/vite";

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: "VitePress",
  description: "VitePress 是一个基于 VuePress 的静态博客生成器",
  base: "/doc-tailwindcss/",
  vite: {
    plugins: [tailwindcss()],
  },
});
