---
title: Iconify与Markdown容器集成示例
description: 展示如何在VitePress中将Iconify图标与markdown-it-container结合使用
---

# Iconify与Markdown容器集成示例

本文档展示如何在VitePress中将Iconify图标与markdown-it-container结合使用，创建带有图标的自定义容器。

## 基本用法

使用自定义容器语法 `::: 容器名称 标题内容`，可以创建带有图标的容器：

::: custom 信息提示
这是一个带有信息图标的容器
:::

::: info 信息提示
这是一个带有信息图标的容器
:::

::: tip 小提示
这是一个带有提示图标的容器
:::

::: warning 警告
这是一个带有警告图标的容器
:::

::: danger 危险
这是一个带有危险图标的容器
:::

::: note 笔记
这是一个带有笔记图标的容器
:::

## 配置说明

### 1. 安装依赖

首先需要安装必要的依赖：

```bash
npm install @iconify/vue iconify-icon markdown-it-container --save
```

### 2. 创建容器工具函数

在 `.vitepress/utils/markdown-container.js` 中创建容器工具函数：

```js
// markdown-container.js
// 用于创建带有Iconify图标的自定义容器

/**
 * 创建带有Iconify图标的自定义容器
 * @param {Object} options 配置选项
 * @param {string} options.name 容器名称
 * @param {string} options.defaultTitle 默认标题
 * @param {string} options.iconPrefix Iconify图标前缀
 * @returns {Function} markdown-it插件函数
 */
export function createIconContainer(options) {
  const {
    name,
    defaultTitle = '',
    iconPrefix = 'tabler:'
  } = options;

  return async (md) => {
    const container = await import('markdown-it-container');
    
    md.use(container.default, name, {
      validate(params) {
        return params.trim().match(new RegExp(`^${name}\\s*(.*)$`));
      },
      render(tokens, idx) {
        const token = tokens[idx];
        
        if (token.nesting === 1) {
          // 开始标签
          const match = token.info.trim().match(new RegExp(`^${name}\\s*(.*)$`));
          const title = match && match[1] ? match[1] : defaultTitle;
          const iconName = options.icon ? `${iconPrefix}${options.icon}` : '';
          
          const iconHtml = iconName 
            ? `<span class="container-icon"><iconify-icon icon="${iconName}"></iconify-icon></span>` 
            : '';
          
          return `<div class="custom-container ${name}">
            <div class="custom-container-title">
              ${iconHtml}
              ${md.utils.escapeHtml(title)}
            </div>
          `;
        } else {
          // 结束标签
          return '</div>\n';
        }
      }
    });
  };
}

/**
 * 创建多种带有Iconify图标的容器
 * @param {Object} containers 容器配置对象
 * @returns {Function} 配置函数
 */
export function createIconContainers(containers) {
  return async (md) => {
    for (const [name, config] of Object.entries(containers)) {
      const containerPlugin = createIconContainer({
        name,
        defaultTitle: config.defaultTitle || '',
        icon: config.icon || '',
        iconPrefix: config.iconPrefix || 'tabler:'
      });
      
      await containerPlugin(md);
    }
  };
}
```

### 3. 在 `.vitepress/config.mjs` 中配置

```js
import { defineConfig } from "vitepress";
import { createIconContainers } from "./utils/markdown-container";

export default defineConfig({
  // 其他配置...
  
  markdown: {
    // 其他Markdown配置...
    
    config: (md) => {
      // 配置带有Iconify图标的容器
      createIconContainers({
        // 信息容器
        info: {
          defaultTitle: '信息',
          icon: 'info-circle',
          iconPrefix: 'tabler:'
        },
        // 提示容器
        tip: {
          defaultTitle: '提示',
          icon: 'bulb',
          iconPrefix: 'tabler:'
        },
        // 警告容器
        warning: {
          defaultTitle: '警告',
          icon: 'alert-triangle',
          iconPrefix: 'tabler:'
        },
        // 危险容器
        danger: {
          defaultTitle: '危险',
          icon: 'alert-octagon',
          iconPrefix: 'tabler:'
        },
        // 笔记容器
        note: {
          defaultTitle: '笔记',
          icon: 'note',
          iconPrefix: 'tabler:'
        }
      })(md);
    }
  },
  
  // 其他配置...
});
```

### 4. 添加客户端组件

在 `.vitepress/theme/index.js` 中添加Iconify组件：

```js
import DefaultTheme from 'vitepress/theme';
import { Icon } from '@iconify/vue';
import 'iconify-icon';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 注册Iconify组件
    app.component('Icon', Icon);
  }
}
```

### 5. 添加样式

在 `.vitepress/theme/custom.css` 中添加样式：

```css
/* 自定义容器样式 */
.custom-container {
  margin: 1rem 0;
  border-left: 0.25rem solid;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  overflow-x: auto;
}

.custom-container-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}

.container-icon {
  margin-right: 0.5rem;
  display: inline-flex;
  align-items: center;
}

/* 各种容器的颜色 */
.custom-container.info {
  background-color: rgba(0, 122, 255, 0.1);
  border-color: #007aff;
}

.custom-container.tip {
  background-color: rgba(52, 199, 89, 0.1);
  border-color: #34c759;
}

.custom-container.warning {
  background-color: rgba(255, 149, 0, 0.1);
  border-color: #ff9500;
}

.custom-container.danger {
  background-color: rgba(255, 59, 48, 0.1);
  border-color: #ff3b30;
}

.custom-container.note {
  background-color: rgba(175, 82, 222, 0.1);
  border-color: #af52de;
}
```

## 自定义图标集

你可以使用任何Iconify支持的图标集，只需修改`iconPrefix`参数：

```js
// 使用Material Design图标
info: {
  defaultTitle: '信息',
  icon: 'info',
  iconPrefix: 'mdi:'
},

// 使用Font Awesome图标
tip: {
  defaultTitle: '提示',
  icon: 'lightbulb',
  iconPrefix: 'fa6-solid:'
}
```

## 更多图标集

你可以在[Iconify图标浏览器](https://icon-sets.iconify.design/)中查找更多图标。

## 注意事项

1. 确保已安装所需的依赖包
2. 如果使用SSR，建议使用`iconify-icon`而不是`@iconify/vue`
3. 可以根据需要自定义容器样式