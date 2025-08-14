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



