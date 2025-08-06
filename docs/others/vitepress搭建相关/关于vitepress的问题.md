---
outline: [1, 4]
---

# 如果想自定义布局页面，使用vue写一个页面，vitepress能做到吗？在此基础上还能使用如Bulma这样的CSS库吗？

## VitePress自定义布局与CSS库集成

是的，VitePress完全支持自定义布局页面并使用Vue来编写。VitePress的一个强大特性就是它允许你完全控制页面的布局和设计。

## 自定义布局的方法

1. 创建自定义布局组件 ：
   在 .vitepress/theme 目录下创建你的Vue组件。
2. 注册布局 ：
   在 .vitepress/theme/index.js 中注册你的布局组件：

   ```
    import DefaultTheme from 'vitepress/theme'
    import MyLayout from './MyLayout.vue'

    export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('MyLayout', MyLayout)
    }
    }
   ```

3. 在Markdown中使用：在任何Markdown文件的frontmatter中指定你的布局：
   ```
    ---
    layout: MyLayout
    ---
   ```

## 使用CSS库

是的，你可以在VitePress中使用任何CSS库，包括Bulma。有几种方式可以集成：

1. 通过NPM安装:
   ```
    npm install bulma
   ```

然后在`.vitepress/theme/index.js`中导入：

```
 import 'bulma/css/bulma.min.css'
```

2. 通过CDN引入: 在`.vitepress/theme/index.js`或自定义组件中添加：

   ```
    // 在enhanceApp中
    enhanceApp({ app, router, siteData }) {
    // 添加到head
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css'
    document.head.appendChild(link)
    }
   ```

3. 自定义CSS：在`.vitepress/theme/custom.css`中引入Bulma并添加你的自定义样式。

# vitepress自带vue吗？不需要安装吗？

VitePress 确实自带 Vue，不需要单独安装 Vue。VitePress 是基于 Vite 和 Vue 3 构建的静态站点生成器，它在安装时会自动将 Vue 作为依赖项安装。

- 当你安装 VitePress（通过 npm install -D vitepress 或其他包管理器）时，它会自动安装 Vue 3 作为依赖
- VitePress 允许你在 Markdown 文件中直接使用 Vue 组件和语法
- 你可以在 .vitepress/theme 目录下创建自定义的 Vue 组件
- 对于自定义布局，你可以创建 Vue 组件并在 .vitepress/theme/index.js 中注册它们
  所以，你可以直接在 VitePress 项目中使用 Vue 的所有功能，包括创建自定义布局页面，而不需要额外安装 Vue。

# 为什么我按VitePress官方文档复制粘贴的团队页写法的代码会报错呢？

先看看源代码：

```
---
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },
  ...
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Our Team
    </template>
    <template #lead>
      The development of VitePress is guided by an international
      team, some of whom have chosen to be featured below.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members />
</VPTeamPage>
```

你可能注意到了，`members`这一串后面有一个省略号`...`， 这只是教学的代替，把它删掉就行，因为不符合语法。

# 为什么我像`./assets/结城希亚.jpg`这样写之后推送到github pages部署出来，团队成员头像无法正常显示呢？

## VitePress中的图片路径处理机制

### 一、VitePress中的静态资源处理原则

首先我们要明白静态资源在VitePress中不同文件夹下的处理原则：

#### 1. public目录的特殊地位

- 自动复制 : public目录下的文件会被原样复制到构建输出的根目录下
- 无需编译 : 这些文件不会经过编译和打包处理
- 路径保持 : 目录结构会在构建后保持不变

#### 2. 其他目录下的资源处理

- 需要编译 : 非public目录下的资源文件(如assets目录)需要经过编译和打包
- 不会自动复制 : 这些文件不会自动复制到构建输出目录
- 需要特殊引用 : 通常需要使用import语句或其他方式引入

### 二、图片路径引用规则

#### 1. Markdown文件中的图片引用

- 简化路径 : 可以使用不带仓库名的路径，如`/assets/image.jpg`
- 自动处理 : VitePress会自动添加base前缀
- 完整路径 : 也可以使用带仓库名的完整路径，如`/doc-demo/assets/image.jpg`

#### 2. Vue组件中的图片引用

> 情况描述 : 在Vue组件中(如团队页面)，<u>**路径不会自动添加base前缀**</u>，图片路径访问不到

这种情况下，使用含有仓库前缀的路径如`/doc-demo/assets/夏娜.jpg`，虽然在**本地开发**时可以正常显示，但在GitHub Pages部署时是**访问不到的**:rage:。

::: info 原因：

- Vue组件中的静态字符串不会被VitePress的路径处理机制处理。

- VitePress中使用frontmatter功能的`layout=page`时, <u>**这个md文件的组件会被编译成一个Vue组件**</u>，这时就需要用Vue的方式引入图片，不像上述一般md文件中的图片引用，一般md文件的图片引用是可以正常支持`./assets/夏娜.jpg`这样的相对定位的路径的:kissing_heart:。
  :::

::: tip
这也是为什么`config.mjs`里配置好`base`属性后例如Logo的路径不加仓库前缀`/doc-demo/`也能正常显示，但md文件里自定义page中写组件时，组件里的路径得加上的原因。
:::

### 三、最佳实践建议

#### 1. 静态资源存放位置和路径写法选择

- 推荐存放位置(仅静态资源与页面耦合程度不高的情况) : 最好在VitePress配置中设置`base: "/doc-demo/"`，将所有静态资源放在`public/assets`目录下
- 引用方式 : 一般直接通过`/assets/image.jpg`引用,不加仓库名（虽然加也不会报错）,这样在更换`base`路径后不用一个个修改。
  目前发现比较特殊的情况就是配置标签页Logo和自定义layout页面时，这里先说一下配置标签页Logo的情况：

```js
head: [["link", { rel: "icon", href: "/doc-demo/assets/Logo.svg" }]], // 标签页图标
```

必须得像这样加上仓库名前缀，否则访问不到。

组件中引用时，如果资源在`public`目录下，引用时得使用`/doc-demo/assets/夏娜.jpg`这样加了仓库前缀的，如果资源不在`public`目录下，引用时可能得使用import语句引入，如`import img from '@/assets/image.jpg'`

#### 2. 特殊情况处理

这里指的**特殊情况**就是在编写自定义layout页面使用frontmatter功能时例如
[vue组件中的图片引用](./关于vitepress的问题.md#_2-vue组件中的图片引用)

```
---
layout: page
---
```

虽然你可以直接使用**GitHub原始链接**来正常显示图片，但是有流量限制、大小限制、加载速度慢的缺点，显然是不合适的。

> ##### VitePress中更优雅的图片导入方式
>
> 前面我们提到，import语句可以在自定义页面中用于导入静态资源，但是这样不便于我们后续的扩展和阅读，毕竟图片这种会越来越多。
> 下面有几种推荐的方式：

- 使用动态导入
  可以使用Vite的`import.meta.glob`动态导入图片，这样可以将所有图片统一管理。

```js
// 批量导入assets目录下的所有图片
const images = import.meta.glob('../DailyRecord/assets/*.{jpg,png,svg}', { eager: true });

// 创建一个映射对象，方便使用
const imageMap = {};
Object.entries(images).forEach(([path, module]) => {
  // 从路径中提取文件名（不含扩展名）
  const name = path.split('/').pop().split('.')[0];
  imageMap[name] = module.default;
});

// 在成员数据中使用
const partners = [
  {
    avatar: imageMap['夏娜'],
    name: '夏娜',
    title: '炎发灼眼的杀手',
  },
  {
    avatar: imageMap['结城希亚'],
    name: '结城希亚',
    title: '芭菲女王',
  },
  // 其他成员...
];
```

下面是我用AI写的一个js文件，你可以直接用于项目下的utils文件夹作为工具类。
你可以参考或者[直接下载](../../.vitepress/utils/imageImports.js){target="download" download}

<!-- 直接下载的写法，如果是md会被转译为html -->

<<< @/.vitepress/utils/imageImports.js
