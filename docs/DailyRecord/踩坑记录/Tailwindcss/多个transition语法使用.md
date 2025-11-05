---
outline: [2, 6]
tags: ['tailwindcss', '语法', '前端']
---

# 指定多个transition属性

## 问题描述
在指定transition属性时，为了不影响多个属性，我们通常会指定transition影响的属性。

但是这在tailwindcssV4版本中，必须使用任意值语法，否则后面的会覆盖前面的属性：
::: danger 错误写法
```html
<div class="
       h-[7rem] hover:h-48
       shadow hover:shadow-lg
       transition-height duration-300 ease-in-out
       transition-shadow duration-300 ease-in-out"> </div>
```
:::
这会导致`transition-shadow`覆盖`transition-height`，从而导致只有`transition-shadow`生效，只有阴影有过渡效果，而高度变化却没有过渡效果。

## 解决方案
正确写法如下，使用任意值语法：
::: success 正确写法
```html
<!-- 方括号里加原生CSS属性名 -->
<div class="transition-[height,box-shadow] duration-800 ease-in-out"></div>
```
:::