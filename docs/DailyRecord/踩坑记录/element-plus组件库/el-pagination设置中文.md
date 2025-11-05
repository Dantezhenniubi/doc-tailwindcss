---
outline: [2, 6]
tags: ['组件库', 'element-plus', '前端', '踩坑记录']
---

# el-pagination设置中文

## 问题描述
我在页面使用了el-pagination组件，但是默认是英文，如何设置中文？

## 解决方案
在引入element-plus时，传入locale参数即可。

在项目入口中(如main.ts或者vitepress的index.ts)引入element-plus的中文包：

```ts
import zhLocale from 'element-plus/dist/locale/zh-cn.mjs';
```

然后在创建app实例时传入该参数：
```ts
import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';

const app = createApp(App);
app.use(ElementPlus, { locale: zhLocale });
app.mount('#app');
```

如果是`vitepress`项目，下面展示如何配置

建议在`.vitepress/locale/zh.ts`中引入element-plus的中文包
```ts
import zhLocale from 'element-plus/dist/locale/zh-cn.mjs';

/* 示例：如果你想要覆盖分页组件文案 */
zhLocale.el.pagination = {
  goto: '跳至',
  pagesize: '条/页',
  total: '共 {total} 条',
  pageClassifier: '页',
};

export default zhLocale;
```

然后在`index.ts`中引入该文件

```ts
import ElementPlus from 'element-plus';
import zhLocale from '../locale/zh';

enhanceApp({ app, router }) {
  app.use(ElementPlus, { locale: zhLocale });
}
```

::: warning 疑问
如果我使用了自动导入，已经导入了element-plus的组件，这里会不会重复导入？

答案是不会

- 模块只被加载一次

Vite/Rollup 遇到相同路径（element-plus）会自动去重，无论你在 vite.config.ts 里 import ElementPlus 多少次，最终都只有 一份 代码被打包。

- locale 文件是「纯数据」

element-plus/dist/locale/zh-cn.mjs 只有 几 KB 的对象常量，无组件、无逻辑；

即使被 AutoImport 和手动 import 各引用一次，也会被 Rollup 合并成单例。

- Tree-Shaking 会剔除未用 locale

你只用了 zh-cn，英文或其他语言包不会进产物。
:::