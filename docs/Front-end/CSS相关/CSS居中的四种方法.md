---
outline: [2, 6]
tags: ['css', '语法', '前端']
---


# CSS居中的四种方法

## Flexbox 布局

最现代、最推荐的居中方法，代码简洁，支持响应式，是当前主流的解决方案。

```vue:demo
<template>
<div class="container">
    <div class="box" style="background-color: red">居中</div>
    <div class="box" style="background-color: green">居中</div>
    <div class="box" style="background-color: blue">居中</div>
</div>
</template>
<style scoped>
.container {
    /* 基础样式(用于演示) */
    height: 300px;
    width: 600px;
    border: 1px solid red;
    background-color: gray;
    /* 居中 */
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
```

## CSS Grid 布局
CSS Grid布局是一种二维布局方式，它可以将容器分为多个网格，然后放置元素，使其在网格中居中。
```vue:demo
<template>
<div class="container">
    <div class="box" style="background-color: red">居中</div>
    <div class="box" style="background-color: green">居中</div>
    <div class="box" style="background-color: blue">居中</div>
</div>
</template>
<style scoped>
.container {
    /* 基础样式(用于演示) */
    height: 300px;
    width: 600px;
    border: 1px solid red;
    background-color: gray;
    /* 居中 */
    display: grid;
    align-items: center;
    justify-items: center;
}
</style>
```

## 绝对定位 + transform
经典的居中方法

```vue:demo
<template>
<div class="container">
    <div class="box" style="background-color: red; height: 200px; width: 200px;">居中</div>
    <div class="box" style="background-color: green; height: 100px; width: 100px;">居中</div>
    <div class="box" style="background-color: blue; height: 50px; width: 50px;">居中</div>
</div>
</template>
<style scoped>
.container {
    /* 基础样式(用于演示) */
    height: 300px;
    width: 600px;
    border: 1px solid red;
    background-color: gray;
    /* 居中 */
    position: relative;
}
.box {
    /* 居中 */
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>
```

## 绝对定位 + margin
需要知道子元素尺寸的经典方法，在固定尺寸场景下比较好用。

```vue:demo
<template>
<div class="container">
    <div class="box" style="background-color: red; height: 200px; width: 200px;">居中</div>
    <div class="box" style="background-color: green; height: 100px; width: 100px;">居中</div>
    <div class="box" style="background-color: blue; height: 50px; width: 50px;">居中</div>
</div>
</template>
<style scoped>
.container {
    /* 基础样式(用于演示) */
    height: 300px;
    width: 600px;
    border: 1px solid red;
    background-color: gray;
    /* 居中 */
    position: relative;
}
.box {
    /* 居中 */
    position: absolute;
    top: 0;left: 0;
    right: 0;bottom: 0;
    margin: auto;
    /* 需要固定宽高，由于例子中内联样式已设，故忽略 */
    /* width: 100px; */
    /* height: 100px; */
}
</style>
```

或者绝对定位部分直接使用`inset: 0;`

```vue:demo
<template>
<div class="container">
    <div class="box" style="background-color: red; height: 200px; width: 200px;">居中</div>
    <div class="box" style="background-color: green; height: 100px; width: 100px;">居中</div>
    <div class="box" style="background-color: blue; height: 50px; width: 50px;">居中</div>
</div>
</template>
<style scoped>
.container {
    /* 基础样式(用于演示) */
    height: 300px;
    width: 600px;
    border: 1px solid red;
    background-color: gray;
    /* 居中 */
    position: relative;
}
.box {
    /* 居中 */
    position: absolute;
    inset: 0;
    margin: auto;
    /* 需要固定宽高，由于例子中内联样式已设，故忽略 */
    /* width: 100px; */
    /* height: 100px; */
}
</style>
```

::: danger 非常不推荐的方式
「把 div 变成行内块（inline-block）再居中」的老办法，但 今天基本已废弃，原因正是 「影响布局 + 副作用多」<br>
已知副作用：vertical-align 污染、white-space 间隙、line-height 撑高、响应式断行、无法网格化<br>
**永 远 不 要 用`inline-block`！**
:::

> 如果你使用了`Tailwind CSS`，请看[这篇文章](../../Front-end/TailwindCSS/布局居中方案.md)