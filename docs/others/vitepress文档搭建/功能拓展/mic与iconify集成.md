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
由于vitepress需要支持SSR，我们安装的应该是`iconify-icon`Web库，拥有更好的SSR兼容
