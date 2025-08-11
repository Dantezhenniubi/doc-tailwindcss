---
title: Iconify容器测试
description: 测试Iconify与markdown-it-container的集成效果
---

# Iconify容器测试

本页面用于测试Iconify与markdown-it-container的集成效果。

## 基本用法

使用自定义容器语法 `::: 容器名称 标题内容`，可以创建带有图标的容器：

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

::: success 成功
这是一个带有成功图标的容器
:::

::: CTcode 代码
这是一个带有代码图标的容器
```js
console.log('Hello, Vitepress!');
console.log('Hello, Vitepress!');
```
:::