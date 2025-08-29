---
outline: [2, 6]
---

# CSS Cascade 层叠规则详解

<span class="marker-text-highlight">这里是荧光笔</span>
层叠（Cascade）是CSS的核心机制，用于解决多个样式规则同时应用于同一元素时的冲突问题。它通过一套明确的规则确定最终应用的样式值。

## 层叠处理的三大要素

层叠规则按照以下优先级顺序进行判断（1 > 2 > 3）：

1. **来源与重要性（Origin & Importance）**
2. **选择器特异性（Selector Specificity）**
3. **源代码顺序（Source Order）**

---

## 来源与重要性（最高优先级）

"**来源与重要性**"是 CSS 层叠规则中最高优先级的判定因素，它决定了不同来源的样式声明之间的优先关系。这个规则的核心在于两个维度：样式来源和 **!important** 标志。

### 样式来源的三个层级

CSS 样式有三种不同的来源，按优先级从低到高排列：<br><br> 1.用户代理样式 (User Agent Styles)

- 浏览器内置的默认样式
- 例如：`<h1>`的粗体、`<a>` 的蓝色和下划线
- 不同浏览器可能有细微差异（可通过 `reset.css`覆盖）
  ::: CTcode 用户代理样式(示例：所有链接默认显示为蓝色下划线文本)

```css
/* 浏览器内置默认样式 */
a {
  color: blue;
  text-decoration: underline;
}
```

:::

2.用户样式 (User Styles)

- 用户通过浏览器设置的自定义样式
- 例如：视力障碍用户设置的大字体或高对比度配色
- 浏览器设置路径：Chrome → 外观 → 自定义字体/字号
  ::: CTcode 用户样式(示例：用户通过浏览器设置强制所有文本为 20px)

```css
/* 用户在浏览器设置的自定义样式 */
body {
  font-size: 20px; /* 视力障碍用户设置的大字号 */
}
```

:::

3.作者样式 (Author Styles)

- 网页开发者编写的样式（最常见的类型）
- 包括：外部 CSS 文件、`<style>` 标签、内联样式
- 例如：` <link rel="stylesheet">` 或 `style="color: red"`
  ::: CTcode 作者样式

```css
/* 开发者编写的样式 */
.header {
  background: #f0f0f0;
  padding: 20px;
}
```

```css
<!-- 内联样式也属于作者样式 -->
<div style="border: 1px solid #ccc"></div>
```

:::

### `!important`的特殊作用

::: warning 推荐
这里讲的是对于来源的作用，关于`!important`对权重的影响，请看这里[选择器特异性](#选择器特异性)
:::

> 💡 `!important` 会改变来源的优先级：<br>

大体来说就是用了之后：用户的重要样式 > 作者的重要样式 > 普通样式：
::: CTcode

```css
/* 普通声明 */
.button {
  background: blue;
}
/* 重要声明 */
.button {
  background: red !important;
}
```

:::

### **来源优先级顺序总结表**

| 优先级   | 来源类型                  | 示例                                                |
| -------- | ------------------------- | --------------------------------------------------- |
| 1 (最低) | 用户代理样式 (普通)       | 浏览器默认的`<p>`边距                               |
| 2        | 用户样式 (普通)           | 用户设置的大号字体                                  |
| 3        | 作者样式 (普通)           | `.container { width: 80% }`                         |
| 4        | 内联样式                  | `style="width: 100%"`                               |
| 5        | CSS动画样式               | `@keyframes` 中的样式                               |
| 6        | 作者样式 (!important)     | `h1 { color: red !important }`                      |
| 7        | 用户样式 (!important)     | 用户强制设置的高对比度                              |
| 8        | 用户代理样式 (!important) | 浏览器强制样式(极罕见)、`display: block !important` |

我们看到即使ID选择器 `#special-button` 特异性更高，带有 `!important` 的规则仍优先应用。
::: CTcode

```css
.button {
  background: blue !important; /* 重要规则 */
}

#special-button {
  background: red; /* 普通规则 */
}
```

:::

#### `!important`的作用机制

1. 普通声明优先级顺序
   ::: CTcode 结果：所有段落的外边距为 2em（作者样式 > 用户样式 > 用户代理样式）

```css
/* 用户代理样式 */
p {
  margin: 1em;
}
/* 用户样式 */
p {
  margin: 1.5em;
}
/* 作者样式 */
p {
  margin: 2em;
}
```

:::

2. `!important`会反转优先级顺序
   ::: CTcode 标题显示为黄色（用户 !important > 作者 !important）

```css
/* 作者样式 */
.title {
  color: black !important;
}
/* 用户样式 */
.title {
  color: yellow !important;
} /* 最终生效 */
```

:::

---

## 选择器特异性

当CSS规则来源相同时（如同在作者样式表中），通过**选择器特异性（Selector Specificity）**决定优先级。
一般这里讨论的是CSS的优先级，具体请看[这篇文章](CSS优先级.md)
在讨论之前，先来看CSS 的 8 种基础的**选择器类型**：

- 内联样式（Inline Styles）， 如`style="color:blue"`，直接应用于元素上的样式，具有最高优先级。

- ID 选择器（ID Selectors）， 如`#id{}`，通过 #id 来选择元素，优先级较高。

---

- 类选择器（Class Selectors）， 如`.class{}`

- 属性选择器（Attribute Selectors）， 如`a[href="segmentfault.com"]{}`

- 伪类选择器（Pseudo-class Selectors）， 如`:hover{}`
  通过类名、属性名或伪类来选择元素，优先级一般。

---

- 伪元素选择器， 如`::before{}`

- 标签选择器， 如`span{}`

- 通配选择器， 如`*{}`，优先级最低。

---

优先级关系：内联样式 > ID 选择器 > 类选择器 = 属性选择器 = 伪类选择器 > 标签选择器 = 伪元素选择器

## 源代码顺序（最终决胜规则）

当来源和特异性均相同时，**后声明的规则覆盖先声明的规则**。
::: CTcode

```css
/* 最终生效：绿色 */
.alert {
  color: red;
}
.alert {
  color: green;
}

/* 最终生效：第二个按钮 - 橙色 */
.button.primary {
  background: blue;
}
[class='button primary'] {
  background: orange;
} /* 特异性相同，后声明胜出 */
```

:::

## 总结：层叠规则应用口诀

> 一判来源重要性，
> 二看选择特异性，
> 最后顺序定输赢，
> 级联图层需留意！

通过理解层叠规则，开发者可以：

- 精准控制样式优先级
- 避免不必要的 `!important`
- 编写可维护的CSS代码
- 高效解决样式冲突问题
