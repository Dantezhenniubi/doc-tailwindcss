# 引入Tailwind CSS V4

## 安装

由于V4版本的Tailwindcss安装方式发生了重大变动，对于Vitepress项目（基于 Vite），强烈推荐使用 Tailwind 的 Vite 插件而不是 PostCSS 插件
这里使用pnpm安装V4版本的Tailwindcss作为vite插件
::: code-group

```bash[⭐pnpm]
pnpm add -D tailwindcss @tailwindcss/vite
```

:::

安装好后，由于本项目使用的是V4版本的Tailwindcss，我一开始安装也是一头雾水，使用老版本初始化配置命令一直报错找不到，经过一番查询，原来V4这个版本在配置上进行了革新

详细推荐去看官方文档[Tailwindcss官方升级说明](https://tailwindcss.com/docs/upgrade-guide#removed-tailwind-directives)
或者AI总结的一些重点：
[关于tailwindcssV4](../关于tailwindcssV4.md)

> - `Tailwind CSS v4`采用零配置内容检测：在大多数情况下，你不再需要像`v3`那样在`tailwind.config.js`文件中手动配置`content`路径来告诉`Tailwind`要扫描哪些文件。**`Tailwind v4`会自动寻找你的模板文件**。此外，如果你需要在 CSS 中明确指定扫描的根路径（例如在 monorepo 项目中），可以使用`source()`函数，如`@import "tailwindcss" source("../src");`。
>   **传统的js配置也是支持的**，详情查看官方文档：[JS配置说明](https://tailwindcss.com/docs/upgrade-guide#using-a-javascript-config-file)

> - Tailwind CSS v4.0 并非设计用于与 Sass、Less 或 Stylus 等 CSS 预处理器配合使用。请将 Tailwind CSS 本身视为您的预处理器，**您不应将 Tailwind 与 Sass 配合使用**，原因与您不应将 Sass 与 Stylus 配合使用相同。因此，您无法在 Vue、Svelte、Astro 等语言中将 Sass、Less 或 Stylus 用于样式表或代码块。

## 配置

在项目的主题文件夹下新增一个CSS用作入口文件，比如在`.vitepress/theme/css`文件夹下创建一个`custom.css`

### 引入核心文件和自定义文件

按项目需求，可以引入带前缀和不带前缀的版本，直接在入口CSS顶部引入即可
::: code-group

```js[前缀版本]
@import "tailwindcss" prefix(tw);
```

```js[无前缀版本]
@import "tailwindcss";
```

:::

### vitepress显式配置

写好入口CSS后，由于项目使用的是vitepress搭建，需要在vitepress的配置文件中显式引入该CSS文件，否则项目启动后不会自动加载

```js
vite: {
    plugins: [
      tailwindcss({
        // 指定 Tailwind 入口文件
        entryPoint: path.resolve(__dirname, "./theme/css/custom.css"),
        // 避免重复注入基础样式
        injectBase: false,
        // 生产环境优化
        minify: process.env.NODE_ENV === "production",
        // 开发环境配置
        ...(process.env.NODE_ENV === "development" && {
          // 开发时禁用压缩以提高构建速度
          minify: false,
          // 启用源码映射以便调试
          sourceMap: true
        })
      }),
    ],
```

### @theme 自定义主题变量

### 自定义字体

#### 本地字体

使用CSS原生的`@font-face`规则加载自定义字体，确保字体文件路径正确。

```js
@font-face {
    font-family: 'Comic Mono';
    src: local('Comic Mono'),
        url('../fonts/ComicMono.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}
```

#### 网络字体

如果从Google Fonts等服务加载字体，请确保将其放在@importCSS 文件的最顶部：

```js{1,4}
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
@import "tailwindcss";
@theme {
  --font-roboto: "Roboto", sans-serif;
}
```

#### 在@theme中定义字体

将字体引入后，在入口文件中的@theme主题变量下自定义该字体，即可在项目中使用对应字体类

```js{2,3}
@theme {
  --font-display: "Oswald", "sans-serif";
  --font-comic-mono: "Comic Mono", monospace;
}
```

#### 使用字体

上述操作完成后，你就可以在代码中使用你定义的字体类了

```js{1}
<div class="font-display">
  <!-- ... -->
</div>
```

#### 全局字体
由于 Vitepress [自身的一些原因](https://vitepress.dev/guide/extending-default-theme#using-different-fonts)：
> VitePress 使用Inter作为默认字体，并将在构建输出中包含该字体。该字体也会在生产环境中自动预加载。

我们需要在vitepress项目中导入`Vitepress无字体默认主题`，并导入字体的CSS文件：
```js
import DefaultTheme from 'vitepress/theme-without-fonts'
import './my-fonts.css'

export default DefaultTheme
```

然后在字体文件中这样去引入覆盖:
```js
/* Orbitron科幻几何无衬线 */
@font-face {
  font-family: 'Orbitron';
  src:
    local('Orbitron'),
    url('../fonts/Orbitron Bold.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* 昆明海鸥体 */
@font-face {
  font-family: 'KMHai';
  src:
    local('KMHai'),
    url('../fonts/KMHai.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

:root {
  /* 基本文本字体 */
  --vp-font-family-base: 'Orbitron', KMHai;
  /* 代码字体 */
  --vp-font-family-mono: 'Orbitron', KMHai;
}
```

> [!TIP]
> 如果你的字体在tailwind的`@theme`中有定义，那么在代码中直接使用类名时会覆盖字体CSS定义的默认字体

### @utility 自定义工具类

在`Tailwind CSS v4`中，`@apply`指令的功能和定位发生了重要变化：

1. **不再是官方推荐方案**

Tailwind v4 官方文档明确表示：
**"在新项目中避免使用 @apply，它仅作为兼容旧项目的过渡方案存在"**

2. **性能缺陷**

使用 @apply 的组件类在 v4 中：
增加 ~30% 的 CSS 体积
降低 PurgeCSS 的优化效率

- **使用**
