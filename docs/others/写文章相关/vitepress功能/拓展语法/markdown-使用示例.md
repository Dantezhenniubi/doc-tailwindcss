# VitePress Markdown 扩展语法使用示例

本文档展示了如何使用 VitePress 中的各种 Markdown 扩展语法，以及如何在 `config.mjs` 中配置这些功能。

## 基础语法

### 标题锚点

配置示例：

```js
markdown: {
  anchor: {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '#'
  }
}
```

使用效果：每个标题旁边会自动添加一个锚点链接，可以直接链接到该标题。

### 表情符号

配置示例：

```js
markdown: {
  emoji: {
    shortcuts: {
      'smile': ['😄'],
      'laughing': ['😆']
    }
  }
}
```

使用示例：

```md
:smile: :laughing: :100: :tada:
```

效果：😄 😆 💯 🎉

## 代码块增强

### 语法高亮

配置示例：

```js
markdown: {
  theme: {
    light: 'github-light',
    dark: 'github-dark'
  },
  lineNumbers: true,
  codeCopyButtonTitle: '复制代码'
}
```

使用示例：

````md
```js
function example() {
  console.log('Hello, VitePress!');
}
```
````

### 行高亮

使用示例：

````md
```js{2,4-5}
function example() {
  console.log('这行会被高亮');
  const a = 1;
  if (a > 0) {
    console.log('这两行也会被高亮');
  }
}
```
````

### 代码导入

使用示例：

````md
```js
<<< @/examples/example.js
```

```js{3}
<<< @/examples/example.js#snippet
```
````

## 容器

配置示例：

```js
markdown: {
  container: {
    tipLabel: '提示',
    warningLabel: '警告',
    dangerLabel: '危险',
    infoLabel: '信息',
    detailsLabel: '详细信息'
  }
}
```

### 提示容器

使用示例：

```md
::: tip 提示标题
这是一个提示内容
:::

::: warning 警告标题
这是一个警告内容
:::

::: danger 危险标题
这是一个危险提示内容
:::

::: info 信息标题
这是一个信息内容
:::

::: details 点击查看更多
这里是详细内容，默认是折叠的
:::
```

### GitHub 风格警告

配置示例：

```js
markdown: {
  gfmAlerts: true
}
```

使用示例：

```md
> [!NOTE]
> 这是一个注释提示

> [!TIP]
> 这是一个小技巧

> [!IMPORTANT]
> 这是一个重要信息

> [!WARNING]
> 这是一个警告

> [!CAUTION]
> 这是一个需要注意的信息
```

## 数学公式

配置示例：

```js
markdown: {
  math: true
}
```

使用示例：

```md
行内公式: $E=mc^2$

块级公式:

$$
E=mc^2
$$
```

## 目录生成

配置示例：

```js
markdown: {
  toc: {
    level: [2, 3, 4],
    includeLevel: [2, 3]
  }
}
```

使用示例：

```md
[[toc]]
```

## 自定义属性

配置示例：

```js
markdown: {
  attrs: {
    leftDelimiter: '{',
    rightDelimiter: '}',
    allowedAttributes: ['id', 'class']
  }
}
```

使用示例：

```md
# 标题 {#custom-id .custom-class}

段落内容 {.text-center #my-id}
```

## 图片处理

配置示例：

```js
markdown: {
  image: {
    lazyLoading: true
  }
}
```

使用示例：

```md
![图片描述](/path/to/image.png)
```

## 组件使用

配置示例：

```js
markdown: {
  component: {
    // 组件相关配置
  }
}
```

使用示例：

```md
<CustomComponent />

<CustomComponent>
  组件内容
</CustomComponent>
```

## 单文件组件

配置示例：

```js
markdown: {
  sfc: {
    // SFC相关配置
  }
}
```

使用示例：

```md
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

# 计数器组件

当前计数: {{ count }}

<button @click="count++">点击增加</button>
```

## 前言 (Frontmatter)

配置示例：

```js
markdown: {
  frontmatter: {
    // 前言相关配置
  }
}
```

使用示例：

```md
---
title: 页面标题
description: 页面描述
layout: custom-layout
---

# 页面内容
```

## 自定义 Markdown 配置

如果需要添加自定义的 markdown-it 插件或配置，可以使用 `config` 选项：

```js
markdown: {
  config: (md) => {
    // 添加自定义插件
    md.use(require('markdown-it-plugin-name'))
    
    // 自定义规则
    md.renderer.rules.customRule = (tokens, idx) => {
      // 自定义渲染逻辑
      return `<custom-element>${tokens[idx].content}</custom-element>`
    }
  }
}
```

## 完整配置参考

请参考 `config-示例.mjs` 文件中的完整配置示例，以及 `官方md类型声明-中文翻译.md` 文件中的详细类型说明。