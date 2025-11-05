---
outline: [2, 6]
tag: ['transition', 'css', '语法']
---

# transition过渡属性
现代网页设计中，用户体验的流畅性至关重要（当然这里指的不是性能问题），CSS的transition属性，可以轻松实现网页元素的过渡效果，将变换过程变得平滑而自然，避免样式瞬间变化的生硬。

## 是什么？
`transition` CSS 属性是 `transition-property`、`transition-duration`、`transition-timing-function` 和 `transition-delay` 的一个简写属性。
- `transition-property` 指定应用过渡属性的名称。
- `transition-duration` 以秒或毫秒为单位指定过渡动画所需的时间。默认值为 0s，表示不出现过渡动画。
- `transition-timing-function`  指定过渡效果的加速度曲线。
- `transition-delay` 规定了在过渡效果开始作用之前需要等待的时间。

看一个简单的例子
```vue:demo
<template>
没有过渡
    <div class="noTransition"></div>
    <br>
    有过渡
    <div class="hasTransition"></div>
</template>
<style scoped>
.noTransition {
    width: 150px;
    height: 50px;
    background-color: red;
}
.noTransition:hover {
    width: 250px;
    background-color: blue;
}
.hasTransition {
    width: 150px;
    height: 50px;
    transition: all 1s linear 0s;
    background-color: red;
}
.hasTransition:hover {
    width: 250px;
    background-color: blue;
}
</style>

```

`transition` 简写属性 CSS 语法如下：
```css
div {
  transition: <property> <duration> <timing-function> <delay>;
}
```

多个动画属性示例：
```vue:demo
<template>
<div class="box">Hover me</div>
</template>
<style scoped>
.box {
  border-style: solid;
  border-width: 1px;
  display: block;
  width: 100px;
  height: 100px;
  background-color: #0000ff;
  transition:
    width 2s,
    height 2s,
    background-color 2s,
    rotate 2s;
}

.box:hover {
  background-color: #ffcccc;
  width: 200px;
  height: 200px;
  rotate: 180deg;
}
</style>
```

::: note 需要注意的点
不是所有属性都支持过渡，在[动画性 CSS 属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_animated_properties)文档中对此有做解释。这部分我们在下面的[可动画的CSS属性](#可动画的CSS属性)中会详细介绍。 
:::

### 当属性值列表长度不一致时
如果任意属性值列表的长度比其他属性值列表要短，则其中的值会重复使用以便匹配。例如：
```css
div {
  transition-property: opacity, left, top, height;
  transition-duration: 3s, 5s;
}
```
将视为：
```css
div {
  transition-property: opacity, left, top, height;
  transition-duration: 3s, 5s, 3s, 5s;
}
```

类似地，如果某个属性的值列表长于 `transition-property` (指定应用过渡的属性，写属性名称)的，将被截短。例如：

```css
div {
  transition-property: opacity, left;
  transition-duration: 3s, 5s, 2s, 1s;
}
```
将按下面这样处理：
```css
div {
  transition-property: opacity, left;
  transition-duration: 3s, 5s;
}
```


### 可动画的CSS属性{#可动画的CSS属性}
我们先搞懂什么是可动画的CSS属性。

> CSS 动画和过渡依赖于**可动画属性**的概念，**除非另有说明，所有 CSS 属性都是可动画的**。每个属性的动画类型决定了该属性的值如何组合- 插值、相加或累积。过渡仅涉及插值，而动画可以使用所有三种组合方法。

按[Web 动画规范](https://drafts.csswg.org/web-animations-1/#animating-properties)所说，Web 动画规范把“**某个 CSS 属性在动画/过渡过程中该怎么从 A 值变成 B 值**”抽象成四种互斥的插值（interpolation）策略(四种动画类型)，外加一条兜底条款。
::: tip 疑问
常说的可插值属性指的是什么？
:::
常说的“插值属性”就是**所有允许做动画/过渡的属性集合，与“不可插值属性”互为补集；至于它们内部再用哪条策略去算中间值，那是第二步的事。**


#### 不可动画化（not animatable）
- 含义：浏览器根本不去插值，此属性不可动画化，动画关键帧里写再多也当没看见；**过渡（transition）** 同样跳过它。

- 例外：动画本身依旧会启动，会触发 `animationstart`(动画开始) 之类事件，只是属性值瞬间跳到最后一帧。

> 例：`animation-direction`、`unicode-bidi` 这类“开关型”元数据属性。

#### 离散（discrete）
- 含义：值不能加减，浏览器就在 50% 处一刀切换。
- 公式：progress(进度值) < 0.5 ? 是起始值 : 是结束值。
> 例：`visibility:hidden → visible`，动画跑到 49% 时仍不可见，50% 瞬间可见；`content`、`background-image` 等也归这类。
::: warning 当然
`visibility`属性 是按自身专用规则行事，只是效果类似离散，`visibility` 自己的定义里补了一段：**“插值：在 50 % 处从起始值跳到结束值”**。
:::

#### 按计算值（by computed value）
- 含义：把已经计算出来的最终值拆成“能加减”的数（长度、颜色、变换矩阵……），每个分量分别线性插值。
- 例外：如果分量、数量或类型对不上，或者任何组件值使用了离散动画，就整体退化成“离散”切换(属性值将合并为离散值)。
> 例：`width:100px→200px`、`color:#f00→#00f`、`transform:scale(1)→scale(2)` 都走这条规则。

#### 可重复列表（repeatable list）
- 含义：先解决“长度不一致”问题——把短列表按最小公倍数重复补齐，再对每位分量按“按计算值”插值；任何一步失败就整体退化成离散。
- 例：stroke-dasharray: 5 10 → 15 20 25（3 个值），先补齐成 5 10 5 10 5 10 与 15 20 25 15 20 25（6 个值），再逐段插值；如果某段是 none→5px 这种不可加值，就退回到 50% 切换。

::: note 看得懂的可以看
所有数字都当作 `computed value` 阶段已经算出来的 `<length>`，单位统一，浏览器内部就是纯数值。

- 拿到两个列表<br>
起始：A = [5, 10]          （2 项）<br>
结束：B = [15, 20, 25]     （3 项）<br>
- 求最小公倍数<br>
len(A) = 2，len(B) = 3<br>
lcm(2, 3) = 6<br>
- 重复补齐<br>
把 A 重复 6/2 = 3 次 → [5, 10, 5, 10, 5, 10]<br>
把 B 重复 6/3 = 2 次 → [15, 20, 25, 15, 20, 25]<br>
- 现在拿到一对等长序列<br>
A′ = [5, 10, 5, 10, 5, 10]<br>
B′ = [15, 20, 25, 15, 20, 25]<br>
- 对每一对对应分量做 按计算值 插值<br>
插值公式（线性）：<br>
V_result = V_start + p · (V_end − V_start) ，p∈[0,1]<br>
逐项写出来就是：<br>

| 索引 | 起始 | 结束 | 中间插值结果（带进度 p） |
| ---- | ---- | ---- | ------------------------ |
| 0    | 5    | 15   | 5 + 10p                  |
| 1    | 10   | 20   | 10 + 10p                 |
| 2    | 5    | 25   | 5 + 20p                  |
| 3    | 10   | 15   | 10 + 5p                  |
| 4    | 5    | 20   | 5 + 15p                  |
| 5    | 10   | 25   | 10 + 15p                 |

于是整个 `stroke-dasharray` 在任意进度 p 下的值就是
`[5+10p, 10+10p, 5+20p, 10+5p, 5+15p, 10+15p]`<br>
动画走到终点（p=1）时
→ [15, 20, 25, 15, 20, 25]<br>
因为长度还是 6，而 SVG 只关心“奇数位/偶数位”对应 实线/空白 的循环，所以视觉上跟原始的 3 项列表完全等价。<br>
补充两点<br>
- 如果某一步发现“对应分量本身不可加”（例如突然混入一个 none 或者单位不同的值），整段 stroke-dasharray 会立即退化成离散动画：前 50 % 保持起始列表，后 50 % 瞬间跳到结束列表。
- 规范允许浏览器在实际渲染时再把 6 项缩回 3 项（因为周期一样），但插值过程必须按 6 项算，保证循环对齐。
:::

通俗点的例子就是：

踩灯带游戏

你有一条 LED 灯带，灯光一亮一灭叫一个“节拍”。

节拍用数字表示：数字多大，亮/灭就持续多久（单位都是 0.1 秒）。

- 起始节奏：2 3                        
读法：亮 0.2 s → 灭 0.3 s → 再从头循环……

- 结束节奏：4 1 2                       
读法：亮 0.4 s → 灭 0.1 s → 亮 0.2 s → 再从头循环……

问题：**两段节奏拍数不一样（2 拍 vs 3 拍），怎么慢慢从起始变到结束？**

- **Step 1 补拍子（最小公倍数）**

2 和 3 的最小公倍数是 6。

把两段都重复到 6 拍：

起始 → 2 3 2 3 2 3

结束 → 4 1 2 4 1 2

现在两边都是 6 拍，可以“一对一”了。

- **Step 2 一对一渐变**

把 6 个数字分别独立做“从 A 到 B 的匀速变化”。

用进度 p（0 ≤ p ≤ 1）表示动画走到哪儿：

| 拍位 | 起始 | 结束 | 中间任意时刻 p 的值 |
| ---- | ---- | ---- | ------------------- |
| 1    | 2    | 4    | 2 + 2p              |
| 2    | 3    | 1    | 3 – 2p              |
| 3    | 2    | 2    | 2（不变）           |
| 4    | 3    | 4    | 3 + 1p              |
| 5    | 2    | 1    | 2 – 1p              |
| 6    | 3    | 2    | 3 – 1p              |

灯带就按这 6 个新数字循环闪，p 从 0 走到 1，节奏就平滑地从“2 3”过渡到“4 1 2”。

- Step 3 对不上就瞬间切
假如结束节奏里突然有个“啪”这种没法加减的符号，

浏览器直接放弃渐变：前一半时间还用旧节奏，后一半时间瞬间换新节奏——这就是“退化成离散动画”。

**可重复列表 = 先让两段节奏“循环补齐”到同样长，再每个数字单独匀速变；谁变不了就全体瞬间换。**
::: success 总之记住
凡是 **“一串数字”** 、并且规范里写着

**“Interpolated as a list of lengths/numbers, repeated to the least common multiple”**

——都是 **“可重复列表”** 插值，套路一模一样：先补拍子，再一对一渐变。
:::

#### 兜底条款
个别属性（典型如 `visibility`）规范里单独写了“插值”段落，就按那段特殊规则走，不再套用上面四种。
::: danger 需要搞清楚的点
`visibility:hidden`不是TailwindCSS的hidden(display:none)，该属性在不改变文档布局的情况下显示或隐藏元素。该属性还可以隐藏行或列。

要隐藏元素并将其从文档布局中删除，请将display属性设置为none而不是使用visibility。
:::

## 过渡行为
`transition-behavior`是一个CSS属性，指定是否对动画行为离散的属性启动过渡效果。

### 是什么
`transition-behavior`属性接受以下值：
```css
/* Keyword values */
transition-behavior: allow-discrete;
transition-behavior: normal;

/* Global values */
transition-behavior: inherit;
transition-behavior: initial;
transition-behavior: revert;
transition-behavior: revert-layer;
transition-behavior: unset;
```

比较常用的是这两个：

`allow-discrete`——将在元素上启用离散动画属性的过渡。

`normal`——对于离散动画属性，元素上不会启用过渡。

`transition-behavior`只有在和其它过渡属性结合使用时才有意义，如果在 **非零持续时间内(transition-duration ≠ 0s)** 没有属性进行动画处理，则加了也不会发生过渡效果。
`transition-behavior` 只是给已经登记在册的离散属性发 **“可以 50 % 切换”的通行证**

如果名单里根本没有离散属性，或者整个过渡被 0 s 短路，那这张通行证就是废纸——**加了也白加，不会有任何过渡效果**。
::: CTcode 生效的
```css
.card {
  transition-property: opacity, display;
  transition-duration: 0.25s;
  transition-behavior: allow-discrete;
}

.card.fade-out {
  opacity: 0;
  display: none;
}
```
:::

::: tip 持续时间最小精确到几位？
- 规范层面<br>
  CSS Values & Units 只规定“时间单位解析到 `μs（微秒，10⁻⁶ s）`”，写入样式表时你可以写`0.000001s / 1us` 都行。<br>
但真正决定是否触发过渡的是计算值取整后的内部时长，各家引擎实现不同：<br>
  - Blink（Chromium）<br>
    把时长转成 μs 整数，≤ 0 μs 就当成 0 s，直接短路。<br>
    所以 `0.000001s` 仍会被视为 `1 μs`，过渡会运行；`0s` 或 `0.0000004s（<0.5 μs）`就被丢弃。<br>
  - WebKit（Safari）<br>
    早期版本用毫秒整数（≤ 0 ms 短路），即 `0.0009s（0.9 ms）`仍算 `1 ms`，会运行；`0.0004s` 算 `0 ms`，不运行。新 WebKit 也已统一到 μs。<br>
  - Gecko（Firefox）<br>
    同样采用 μs 精度，≤ 0 μs 不运行。<br>
- 实际写代码<br>
    只要 **> 0 μs** 就能保证过渡任务被创建；<br>
    日常写 0.25s、250ms、0.001s 都远远高过这个阈值，无需担心“精度抹平成 0”。<br>
:::

### 总结
- `transition-behavior: allow-discrete` 是 CSS Transitions Level 4 新增的一个“子属性”，专门用来**让离散动画也能被 transition 照顾到**。

  默认值是 normal，表示离散值（`display: none ↔ block`、`visibility: hidden ↔ visible` 等）**直接跳变，不插值**；

  写成 `allow-discrete` 后，浏览器就会对这类属性也去做“50 % 切换”的过渡，而不是瞬间跳。

- 新语法允许把 transition-behavior 直接塞进简写 transition 里，位置放在最后：

  `transition: <property> <duration> <timing-function> <delay> [allow-discrete?]`

- 老浏览器不认识这个新关键字，会把它当成非法值，于是整条简写被丢弃——相当于“没有过渡”。

```css
.card {
  /* ① 老语法，保证旧浏览器也能过渡常规属性（opacity、transform…） */
  transition: all 0.25s;

  /* ② 新语法，再写一次同样的过渡，但追加 allow-discrete */
  transition: all 0.25s allow-discrete;
}

.card.fade-out {
  opacity: 0;
  display: none;   /* 离散属性，有了 allow-discrete 才能“淡完再消失” */
}
```
写两条一模一样的 `transition`，第一条不加关键字保兼容性，第二条加 `allow-discrete` 让新浏览器也能过渡离散值——这就是**最安全的渐进增强写法**。