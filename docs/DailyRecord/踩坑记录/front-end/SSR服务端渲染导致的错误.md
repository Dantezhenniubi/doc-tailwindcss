---
outline: [2, 6]
tags: ['vitepress', 'SSR', '前端']
---

# SSR服务端渲染导致的错误

## 问题描述
我vitepress编写了一个文章瀑布流动画组件，它操作了`document`对象，但是由于是服务端渲染，所以会报错，SSR环境不可用。

## 解决方案
在config配置中添加vite相关配置：
::: CTcode
```js
export default { 
  vite: {
    build: {
      // 解决大文件警告
      chunkSizeWarningLimit: 1000,
    },
    ssr: {
      // 解决 Element Plus CSS 在 SSR 中的问题
      noExternal: ['element-plus'],
    },
  }
}
```
:::

对于组件的代码：
1. 添加 inBrowser 检测：
::: CTcode
```js
import { useRoute, inBrowser } from 'vitepress';
```
:::
2. 创建安全的 DOM 操作函数：
::: CTcode
```js
const safeQuerySelectorAll = (selector) => {
  if (!inBrowser) return [];
  return document.querySelectorAll(selector);
};
```
:::
3. 所有 DOM 操作前添加 inBrowser 检查：
::: CTcode
```js
// 在所有使用 document、window 的地方添加检查
if (inBrowser) {
  // DOM 操作代码
}
```
:::


vitepress的`<ClientOnly>`[官方](https://vitepress.dev/guide/ssr-compat#clientonly)没试过，不知道有没有用