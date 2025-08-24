
# HTML 中引入 CSS 的方式
有 4 种方式可以在 HTML 中引入 CSS。其中有 2 种方式是在 HTML 文件中直接添加 CSS 代码，另外两种是引入 外部 CSS 文件。下面我们就来看看这些方式和它们的优缺点。

## 内联方式
内联方式指的是直接在 HTML 标签中的`style`属性中添加 CSS。
::: CTcode
```css
<div style="background: red"></div>
```
:::
这通常是个很糟糕的书写方式，它只能改变当前标签的样式，如果想要多个`<div>`拥有相同的样式，你不得不重复地为每个`<div>`添加相同的样式，如果想要修改一种样式，又不得不修改所有的`style`中的代码。很显然，内联方式引入 CSS 代码会导致 HTML 代码变得冗长，且使得网页难以维护。

## 嵌入方式
嵌入方式指的是在 HTML 头部中的`<style>`标签下书写 CSS 代码。
::: CTcode
```css
<head>
    <style>

    .content {
        background: red;
    }

    </style>
</head>
```
:::

嵌入方式的 CSS **只对当前的网页有效**。因为 CSS 代码是在 HTML 文件中，所以会使得代码比较集中，当我们写模板网页时这通常比较有利。因为查看模板代码的人可以一目了然地查看 HTML 结构和 CSS 样式。因为嵌入的 CSS 只对当前页面有效，所以**当多个页面需要引入相同的 CSS 代码时，这样写会导致代码冗余，也不利于维护**。

## 链接方式
链接方式指的是使用 HTML 头部的`<head>`标签引入外部的 CSS 文件。
::: CTcode
```css
<head>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
```
:::
这是最常见的也是**最推荐的引入 CSS 的方式**。使用这种方式，所有的 CSS 代码只存在于单独的 CSS 文件中，所以具有良好的可维护性。并且所有的 CSS 代码只存在于 CSS 文件中，CSS 文件会在第一次加载时引入，以后切换页面时只需加载 HTML 文件即可。

## 导入方式
导入方式指的是使用 CSS 规则引入外部 CSS 文件。
::: CTcode
```css
<style>
    @import url(style.css);
</style>
```
:::
