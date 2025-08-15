# 引入Tailwind CSS V4

vitepress和Tailwind CSS V4本身其实是有点小冲突的，因为V4用的是原生CSS层，大概是样式优先级的问题。
具体可以看这个[issue](https://github.com/vuejs/vitepress/issues/4425)
如果你想省事，可以安装这位佬的快速启动模板[Vitepress-Tailwindcss](https://github.com/dealenx/vitepress-tailwind)

## 安装依赖
具体要安装的依赖有@tailwindcss/postcss、@tailwindcss/vite、tailwindcss
因为不仅要作为vite插件，也要进行样式分层
::: CTcode
```sh
pnpm add -D @tailwindcss/postcss @tailwindcss/vite tailwindcss

```
:::

安装好后，由于本项目使用的是V4版本的Tailwindcss，我一开始安装也是一头雾水，使用老版本初始化配置命令一直报错找不到，经过一番查询，原来V4这个版本在配置上进行了革新<br>
具体版本升级内容推荐去看官方文档[Tailwindcss官方升级说明](https://tailwindcss.com/docs/upgrade-guide#removed-tailwind-directives)





## 配置

在项目的主题文件夹下新增一个CSS用作入口文件，比如在`.vitepress/theme/css`文件夹下创建一个`tailwind.css`

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

写好入口CSS后，由于项目使用的是vitepress搭建，需要在vitepress的配置文件的`vite`选项中说明，否则项目启动后不会自动加载

```js
vite: {
    plugins: [tailwindcss()],
  },
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
