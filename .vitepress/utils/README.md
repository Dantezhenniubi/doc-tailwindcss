# VitePress 自定义容器

本目录包含了 VitePress 自定义容器的相关文件，用于创建带有 Iconify 图标的自定义容器。

## 文件说明

- `container-config.js`: 容器配置文件，用于集中管理所有自定义容器的配置
- `container-style-generator.js`: 容器样式生成器，用于根据配置生成 CSS 样式
- `markdown-container.js`: 容器创建工具，用于创建带有 Iconify 图标的自定义容器

## 使用方法

### 在 Markdown 中使用容器

```md
::: 容器类型 [可选标题]
内容
:::
```

例如：

```md
::: info
这是一个信息容器
:::

::: tip 提示标题
这是一个带有自定义标题的提示容器
:::
```

### 添加新的容器类型

1. 在 `container-config.js` 文件中添加新的容器配置：

```js
// 在 containerConfigs 对象中添加新的容器配置
export const containerConfigs = {
  // 现有容器配置...
  
  // 新增容器
  newContainer: {
    defaultTitle: "新容器",
    icon: "icon-name",  // Iconify 图标名称（不含前缀）
    iconPrefix: "tabler:",  // 图标前缀，默认为 'tabler:'
    colors: {
      bg: '#背景色',
      border: '#边框色',
      title: '#标题色'
    }
  }
};
```

2. 无需修改其他文件，系统会自动加载新的容器配置

## 自定义容器样式

容器样式定义在 `.vitepress/theme/custom.css` 文件中，由 `container-style-generator.js` 自动生成。如果需要修改容器的基础样式，可以编辑 `container-style-generator.js` 文件中的 `generateContainerStyles` 函数。

## 可用的容器类型

- `info`: 信息容器
- `tip`: 提示容器
- `warning`: 警告容器
- `danger`: 危险容器
- `note`: 笔记容器
- `custom`: 自定义容器
- `success`: 成功容器
- `code`: 代码容器

## 示例

可以查看 `others/写文章相关/Vitepress功能/拓展语法/新增容器测试.md` 文件，了解各种容器的使用示例。