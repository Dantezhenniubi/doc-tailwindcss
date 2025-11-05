---
outline: [2, 6]
tags: ['Eslint', '纯动画组件', '代码检查', '前端']
---

# Eslint在纯动画组件报错

## 问题描述
纯动画组件因为没有`<template>`标签在eslint中报错

## 解决方案
直接在文件顶部添加以下内容在组件内禁用eslint规则
::: CTcode
js文件里的写法
```js
/* eslint-disable vue/valid-template-root */
```
或者vue文件里的写法
<!-- eslint-disable vue/valid-template-root -->
```
:::