---
outline: [2, 6]
tag: ['transition', 'tailwindcss', '语法']
---

# transition
在TailwindCSS中的`transition`是用于控制哪些 CSS 属性转换的实用程序。

`transition`类名格式为`transition-[property]`，其中`[property]`是CSS属性名。

其中，已经有一些tailwindcss预设的实用类如`transition-all`、`transition-colors`、`transition-shadow`。

详情请看[官方文档](https://tailwindcss.com/docs/transition-property)

## transition是什么？
这个提到CSS的基础，请转到[这篇文章](../TailwindCSS/../CSS相关/transition过渡属性.md)

## 默认支持的过渡属性
**本文要提到的，不是语法问题，而是属性能否应用过渡的问题。**

::: danger 不能过渡的属性(瞬间跳变，无补间)
| 属性                           | 原因                                    |
| ------------------------------ | --------------------------------------- |
| `display`                      | 离散值（none/block/inline）             |
| `visibility`                   | 离散值（visible/hidden）                |
| `position`                     | 离散值（static/relative/absolute…）     |
| `float`                        | 离散值（left/right/none）               |
| `background-image`             | 渐变/图片是「替换内容」，浏览器无法插值 |
| `font-family`                  | 离散字符串，无中间态                    |
| `content` (`::before/::after`) | 字符串/url，无法插值                    |
| `grid-template-*`              | 复杂轨道定义，目前仅 Chrome 实验支持    |
| `writing-mode`                 | 离散值                                  |
| `pointer-events`               | 离散值                                  |
:::

::: success Tailwindcss支持的transition语法
| 类名                           | 生成的 CSS                                                                                 | 作用范围                                     |
| ------------------------------ | ------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `transition`                   | `transition: background, border-color, color, box-shadow, transform, opacity …`            | **官方预设 6 个常用属性**                    |
| `transition-all`               | `transition: all …`                                                                        | **所有能过渡的属性**（性能最差，最后才用）   |
| `transition-colors`            | `transition: color, background-color, border-color, text-decoration-color, fill, stroke …` | **纯颜色类**                                 |
| `transition-opacity`           | `transition: opacity …`                                                                    | **仅透明度**（GPU 加速）                     |
| `transition-shadow`            | `transition: box-shadow, drop-shadow …`                                                    | **阴影变化**（不改布局）                     |
| `transition-transform`         | `transition: transform, translate, rotate, scale …`                                        | **位移/旋转/缩放**（60fps 推荐）             |
| `transition-none`              | `transition: none !important`                                                              | **强制取消过渡**                             |
| `transition-width` / `height`  | `transition: width` / `height …`                                                           | **尺寸变化**（比 transform 重）              |
| `transition-[prop,prop]`       | `transition: prop, prop …`                                                                 | **任意值过渡（≥3.1）**，只列你真正要动的属性 |
| `transition-[custom-property]` | `transition: --my-var …`                                                                   | **自定义 CSS 变量过渡（≥3.2）**              |
:::

::: tip 提示
`transition`和`transition-all`有点区别，`transition`只包含Tailwind 官方预设 6 样：`background-color、border-color、color、fill、stroke、opacity、box-shadow、transform`，而transition-all包含所有能应用的属性。
:::

## 为离散值添加过渡
### 为什么会出现「离散值无法过渡」
传统 `transition` 只能在`可插值（numeric）`属性间做平滑动画，例如：
- opacity: 0 → 1
- transform: translateX(0) → 100px
而离散值（display、visibility、justify-content 等）没有中间态，浏览器无法插值，因此**瞬间跳变**。

关于可插值和离散属性：
| 动画类型     | 代表属性                                      | Tailwind 过渡类                                                                           | 能否平滑                    | 备注                   |
| ------------ | --------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------- | ---------------------- |
| **插值型**   | `opacity`、`color`、`transform`、`box-shadow` | `transition-opacity` / `transition-colors` / `transition-transform` / `transition-shadow` | ✅ 平滑                      | **优先用**             |
| **列表插值** | `background-position`、`box-shadow`（多阴影） | `transition-all` 或 `transition-[background-position,box-shadow]`                         | ✅ 平滑                      | 列表长度一致即可       |
| **离散型**   | `display`、`visibility`、`justify-content`    | `transition-discrete` 或 `transition-[prop,prop]`                                         | ❌ 无补间，**0%/50% 硬切换** | **Tailwind 3.3+** 支持 |
| **不可动画** | `animation`、`transition` 自身                | 无                                                                                        | ❌ 永不参与过渡              | 规范禁止               |

建议阅读[这篇关于过渡行为的文章](https://css-tricks.com/almanac/properties/t/transition/transition-behavior/)

### `transition-behavior: allow-discrete` 是什么
CSS 新增属性，**允许离散值参与过渡**，但**不插值**，而是在 **50% 时刻** 或 **0%/100% 特殊时刻** 硬切换值，其余时间继续过渡其他可插值属性。
- normal：转换不会针对离散属性启动，仅针对可插值属性启动。
- allow-discrete：将针对离散属性和可插值属性开始转换。

1. 语法
::: CTcode 语法
```css
transition: opacity 300ms, display 300ms allow-discrete;
/* 或独立属性 */
transition-behavior: allow-discrete;
```
:::
2. 行为差异

| 属性                          | 切换时机       | 效果                            |
| ----------------------------- | -------------- | ------------------------------- |
| `display:none↔block`          | **0% 或 100%** | 整个动画期间可见，最后才 `none` |
| `visibility:hidden↔visible`   | **50%**        | 瞬间显/隐，其余时间过渡其他属性 |
| `justify-content:left↔center` | **50%**        | 先过渡其他属性，中途切换值      |

### Tailwind CSS 支持（≥3.3）
Tailwind默认支持以下实用程序：
| **Class**                          | **Styles**       |
| ----------------------------- | -------------- |
| `transition-normal`          | `transition-behavior: normal;` |
| `transition-discrete`   | `transition-behavior: allow-discrete;`        |

实际使用：
::: CTcode
```html
<!-- 只让离散值参与过渡 -->
<div class="transition-discrete duration-300"></div>

<!-- 混合：可插值 + 离散 -->
<div class="transition-opacity duration-300 transition-discrete"></div>

<!-- 任意值写法 -->
<div class="transition-[opacity,display] duration-300"></div>
```
:::

### 完整实战：「淡入 + display」双向过渡
```vue
<template>
<button popovertarget="p">Toggle</button>
<div id="p" popover class="bg-sky-500 transition-[opacity,display] duration-800 transition-discrete!
                            opacity-0 starting:open:opacity-0 peer-has-checked:opacity-100">
  我是过渡元素~
</div>
</template>

<style scoped>
/* 进入起点（@starting-style 必须写） */
@starting-style {
  #p:popover-open {
    opacity: 0;
  }
}
/* 打开状态 */
#p:popover-open {
  opacity: 1;
}
</style>
```

### 与 `@starting-style` 配对（必须）
离散值从 none → 可见时，浏览器**不会自动应用过渡起点**，必须用 `@starting-style` 显式声明：
::: CTcode
```css
@starting-style {
  dialog[open] {
    opacity: 0;
  }
}
```
:::

::: tip 可以这么写
参考[官方文档](https://tailwindcss.com/docs/hover-focus-and-other-states#starting-style)

我们可以使用`starting`变量来设置元素在 DOM 中首次呈现时的外观，或从`display: none`可见过渡时的外观：
```html{3}
<div>
  <button popovertarget="my-popover">Check for updates</button>
  <div popover id="my-popover" class="opacity-0 starting:open:opacity-0 ...">
    <!-- ... -->
  </div>
</div>
```
:::

## 浏览器支持（截止至2025-07）
| 引擎         | 版本 | 备注                              |
| ------------ | ---- | --------------------------------- |
| Chromium     | 109+ | 完整支持                          |
| Firefox      | 112+ | 完整支持                          |
| Safari       | 17+  | 完整支持                          |
| Tailwind CSS | 3.3+ | 提供 `transition-discrete` 工具类 |

## Tailwind 速查表
| 功能         | 类名                           | 生成 CSS                                           |
| ------------ | ------------------------------ | -------------------------------------------------- |
| 只过渡离散值 | `transition-discrete`          | `transition-behavior: allow-discrete;`             |
| 混合过渡     | `transition-[opacity,display]` | `transition: opacity …, display … allow-discrete;` |
| 取消离散过渡 | `transition-normal`            | `transition-behavior: normal;`                     |
