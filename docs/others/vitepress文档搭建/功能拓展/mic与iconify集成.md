---
outline: [1,6]
---

# 将`markdown-it-container`插件与`iconify`集成至`vitepress`
`vitepress`默认的`markdown`容器实在是太难看了！！！
对我说的就是类似这种:
```md
::: info 信息提示
这是一个带有信息图标的容器
:::
```
由于本文档博客已经修改了样式，故不展示自己体会（<br>
下面教程相当于美化这种容器，使它看起来更美观的同时，你也可以自定义想要的md容器

## 安装插件
### 安装`markdown-it-container`插件

首先安装[markdown-it-container](https://github.com/markdown-it/markdown-it-container)插件<br>
```sh
pnpm add -D markdown-it-container 
```

这个插件相当于为`markdown-it`的`markdown 解析器`创建块级自定义容器，具体你可以参考官方仓库或者我的工具函数<br>

<<< @/.vitepress/utils/markdown-container.js

### 安装`iconify`图标库
我们知道，`VitePress`是一个[静态站点生成器](https://en.wikipedia.org/wiki/Static_site_generator) (SSG)<br>
通过使用 Vue 的服务器端渲染 (SSR) 功能，VitePress 能够在生产构建期间在 Node.js 中预渲染应用程序。这意味着**主题组件中的所有自定义代码都需要考虑 SSR 兼容性**。
这里有两种方案，一种对SSR友好，一种虽然也支持但需指定参数(呃至少我没感觉区别)

#### 安装`iconify-icon`库
`Iconify Icon`是一个呈现图标的 Web 组件。<br>
可以与所有支持 Web 组件的现代框架完美兼容。<br>
如果使用[捆绑器](../../../Front-end/前端工程化/模块打包器.md)构建项目，则可以通过安装`iconify-icon`作为**依赖项**并将其导入到项目中
```sh
pnpm add iconify-icon
```

然后在`.vitepress/theme`文件夹下的`index.js`文件中顶部引入`iconify-icon`库
```js
import 'iconify-icon'
```
::: tip
该Web 组件使用了`Shadow DOM`，简化了`SSR水合(hydration)`操作，按官方的说法:<br>
Web 组件使用的 Shadow DOM 解决了 Hyplication 问题。当 UI 框架在服务端渲染图标时，它只会渲染`<iconify-icon>`元素。在 Hyplication 过程中，UI 框架只会检查`<iconify-icon>`元素，而不会检查实际的图标。
> [点此查看官方说法](https://iconify.design/docs/iconify-icon/#shadow-dom)
:::

接着我们需要在vitepress项目的config配置文件中的vue选项中指明`iconify-icon`，项目才会识别
```js
import { defineConfig } from 'vitepress'

export default defineConfig({
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag === 'iconify-icon'
      }
    }
  },
})
```

#### 安装`@iconify/vue`库(和`iconify-icon`库二选一)
`@iconify/vue`是一个 Vue 组件库，用于在 Vue 应用程序中使用`Iconify`图标。<br>
它提供了一个简单的 API，用于在 Vue 组件中渲染图标。<br>
```sh
pnpm add -D @iconify/vue
```
你需要在`.vitepress/theme/index.js`文件中引入`@iconify/vue`库
```js
import { Icon } from '@iconify/vue'
```
然后在`components`选项中注册`Icon`组件
```js{5}
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册Iconify组件
    app.component('Icon', Icon);
  },
};
```

::: tip
如果你使用的是`@iconify/vue`库，需要将本文`markdown-container.js`工具类里所有`iconify-icon`的tag替换为`Icon`
就像是这样
```css
// 改动前
<span class="container-icon"><iconify-icon icon="${iconName}"></iconify-icon></span>
// 改动后
<span class="container-icon"><Icon icon="${iconName}"></Icon></span>
```
:::


## 编写工具类
按本项目的做法，是编写了三个工具类：
- `container-config.js`容器配置数据，定义md容器基础，用于下面两个生成器
- `container-style-generator.js`容器样式生成器，用于根据容器配置生成CSS样式，与markdown-container.js配合
- `markdown-container.js`容器生成器，用于创建带有Iconify图标的自定义容器

下面是参考代码：

### 容器配置数据
<<< @/.vitepress/utils/container-config.js

### 容器样式生成器
::: warning 布局转变
由于Web 组件并非即时渲染，可能会有几毫秒的延迟。<br>
造成这种情况的原因是：
- JavaScript。Web 组件必须先加载并注册才能呈现。
- 由于 Web 组件规范，渲染在浏览器中是异步完成的，因此经常会导致微小的延迟。

这可能会导致布局转变。
为了避免布局偏移，请将其添加到您的 CSS 中：
```css
/* 避免布局偏移 */
iconify-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
}
```
:::
<<< @/.vitepress/utils/container-style-generator.js

### 容器生成器
<<< @/.vitepress/utils/markdown-container.js


## 指定容器样式文件路径
以本文上述工具类为例，我们需要在`vitepress`项目的`config.js`文件中指定容器样式文件路径，并引入相关的工具类<br>
在`markdown`配置下编写以下内容
```js
// 引入文件系统模块
import fs from "fs/promises"; 
// 引入路径模块
import path from "path";  
// 导入markdown容器相关方法
import { createIconContainers } from "./utils/markdown-container.js";
// 导入markdown容器样式生成器
import { writeContainerStyles } from "./utils/container-style-generator.js";

export default defineConfig({
// 插件
    markdown{
        config(md) {
            // 配置带有Iconify图标的容器
            createIconContainers()(md);
            // 按你喜好来命名CSS文件，作为md自定义容器的专用CSS文件
            const customCssPath = path.resolve(__dirname, "theme/md-container.css");
            writeContainerStyles(customCssPath, async (filePath, content) => {
            await fs.writeFile(filePath, content, "utf-8");
            });
        },
    }
})    
```

然后你的项目指定路径下就会生成对应的CSS文件

::: tip
别忘了在`.vitepress/theme`的`index.js`下引入这个CSS文件
```js
import './md-container.css'
```
或者你有总的一个CSS文件，直接引入里面就好
```css
@import './md-container.css'
```
:::