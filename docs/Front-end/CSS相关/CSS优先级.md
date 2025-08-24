## 选择器特异性（中等优先级）{#选择器特异性}

当CSS规则来源相同时（如同在作者样式表中），通过**选择器特异性（Selector Specificity）**决定优先级。特异性是一个衡量CSS选择器权重值的系统，决定了哪些样式声明将被应用。

### 特异性计算规则（权重得分由四个部分组成）

特异性按以下层级计算（从高到低）：

#### 1. 内联样式
- 直接在HTML元素上使用`style`属性
- **特异性得分**：`1-0-0-0`
- **示例**：`<div style="color: red;">`

#### 2. ID选择器
- 通过`#`前缀标识的选择器
- **每个ID得**：`0-1-0-0`
- **示例**：`#header`, `#main-content`

#### 3. 类/属性/伪类选择器
- **类选择器**：`.btn`, `.active`
- **属性选择器**：`[type="text"]`, `[href^="https"]`
- **伪类**：`:hover`, `:focus`, `:nth-child()`, `:not()`
- **每个得**：`0-0-1-0`

#### 4. 元素/伪元素选择器
- **元素选择器**：`div`, `p`, `ul`
- **伪元素**：`::before`, `::after`, `::first-line`
- **每个得**：`0-0-0-1`

### 特异性比较原则 {#特异性比较原则}


#### 1.基本权重比较
1. **从左向右逐级比较**：
- `1-0-0-0` > `0-2-0-0` > `0-1-0-0` > `0-0-2-0` > `0-0-0-2`
注意是**逐级比较**！请看下面的**不进位原则**
2. **不进位原则**：
- `0-0-12-3` < `0-1-0-0`（尽管12>1，但高位比较优先）
- `0-1-0-0` > `0-0-100-100`（ID选择器权重高于类选择器）
```css
/* 特异性: (0,0,1,0) */
.button { color: blue; }

/* 特异性: (0,0,2,0) */
.card .button { color: red; }

/* 特异性: (0,1,1,0) */
#sidebar .button { color: green; }
```
::: success 结果
- `.button`元素应用绿色文本（最高特异性）
:::

#### 2.**特殊选择器处理(重要！！！)**
- 通配符(`*`)：`0-0-0-0`（不影响特异性）
- 组合符(`>`、`+`、`~`): 不影响特异性
- `:not()`伪类：本身不增加权重，但内部选择器计入特异性
- `:is()`和`:where()`：权重取参数中最高的选择器(`:where()`权重始终为0)
##### 包含关系元素
如果元素是包含关系，浏览器会同时匹配所有适用的选择器
以li和a为例，我们列出以下结构：
::: CTcode
```html
<ul>
  <li>
    <a>项目1</a>
  </li> 
</ul>
```
```css
/* 悬停li时 */
li:hover a {
  background-color: #e0f7fa;
  border: 1px solid #00bcd4;
}
/* 悬停a时 */
li a:hover {
  background-color: #fff8e1;
  border: 1px solid #ffc107;
  transform: scale(1.05);
}
```
:::

此时，a是li的子元素<br>
`li:hover a`（因为a是li的子元素，悬停在a上就意味着悬停在li上）<br>
`li a:hover`（直接悬停在a元素上）<br>
当鼠标进入li区域时，只触发了选择器`li:hover a`，但**当鼠标进入了li中的a时，会同时触发`li:hover a`和`li a:hover`进行权重比较**<br>
本例子中，由于`li a:hover`代码顺序为后定义，权重相同的情况下优先级更高，所以优先应用

##### :not()和:where()的特殊性
由于这俩本身不计权重，所以看内部权重即可
`:is()`取内部最高权重，`:where()`包括其内部权重为0
```css
/* 特异性: (0,0,1,0) */
.item { border: 1px solid #ccc; }

/* 特异性: (0,0,1,1) - 内部div计入 */
.item:not(div) { border-color: red; }

/* 特异性: (0,1,1,0) - 内部#special计入 */
.item:not(#special) { border-color: blue; }

/* :not() 内部计入权重 */
div:not(.excluded) { /* 特异性: (0,0,1,1) */ }
   
/* :where() 内部不计权重 */
div:where(.content) { /* 特异性: (0,0,0,1) */ }
```

---

#### 3.定义顺序优先
**权重相同时，无论选择器类型如何，后定义的样式优先于前定义的样式**
::: CTcode 后定义的优先于前定义的
```css
/* 权重: (0,0,1,2) - 1个伪类(:hover)(0,0,1,0) + 2个元素(li和a)(0,0,0,2)  */
li:hover a { color: blue; }

/* 权重: (0,0,1,2) - 1个伪类(:first-child)(0,0,1,0) + 2个元素(li和a)(0,0,0,2)*/
li:first-child a { color: red; }
```
:::
::: success 结果
**最终显示为red**
:::
来看一个经典例子：同一个标签有多个类名修饰，类名的先后顺序有影响吗？
::: CTcode 同一个标签有多个类名修饰，类名的先后顺序有影响吗？
```css
#div1 .div2{
  color: red;
}
#div1 .div4{
  color: blue;
}
#div1 .div3{
  color: pink;
}
```
```html
<body>
  <div id="div1">
    <div class="div2 div3 div4">
        谁优先呢？
    </div>
  </div>
</body>
```
:::
::: success 结果
**最终结果是color: pink;获胜**，因为：
**类名的先后顺序不影响样式，看权重和定义顺序，权重相同的前提下，后面写的样式会覆盖前面的样式。**
:::

 ---

#### 4.直接应用和继承应用
**直接应用的样式大于继承样式，继承的样式优先级为 0，甚至低于通配符选择器 ***<br>

✅ 直接样式 > 继承样式 是CSS的核心规则。<br>
✅ 继承样式仅作为默认值存在，一旦元素有直接设置的样式，立即失效。<br>
✅ 优先级权重计算时，继承样式不参与竞争（权重为0）。<br>

所以比较权重之前，先看是直接应用的还是继承的~
- **直接应用**指的是样式直接声明在应用的标签里
- **继承样式**指的是元素由于父子嵌套关系影响，从父元素继承而来的样式

1. 继承样式的优先级最低<br>
::: CTcode 示例
```html
<!-- 继承的样式优先级为 0，甚至低于通配符选择器 * -->
<div style="color: blue;">
  <p id="text">Hello World</p>
</div>
```
```css
* {
  color: red; /* 通配符选择器 */
}
```
:::
::: success 结果
`<p>` 的文字为红色（通配符直接应用 > 继承样式）。
:::
2. 直接样式的优先级规则<br>
任何直接选择器（即使是最简单的元素选择器）都优先于继承样式。
::: CTcode 示例
```html
<!-- 结构1：继承应用 -->
<div style="color: blue;">
  <p>Hello <span>World</span></p>
</div>
```
```css
span {
  color: black; /* 直接样式，元素选择器 */
}
```
:::
::: success 结果
 - "Hello" 继承蓝色（无直接样式）  
 - "World" 为黑色（直接样式覆盖继承）
:::
3. 优先级计算
CSS优先级按权重计算（从高到低）：
- `!important` > `内联样式（权重 1000）` > `ID选择器（权重 100）` > `类/伪类/属性选择器（权重 10）` > `元素选择器（权重 1）` > `继承样式（权重 0）→ 最低优先级`
- 继承样式不参与权重计算，始终被直接样式覆盖。

##### 实际应用场景
::: CTcode 场景1：字体颜色覆盖
```html
<div class="parent" style="color: green;">
  Parent Text
  <div class="child">Child Text</div>
</div>
```
```css
.child {
  color: orange; /* 直接样式生效 */
}
```
:::
::: success 结果
 - "Parent Text" → 绿色（直接应用）
 - "Child Text" → 橙色（直接样式 > 继承的绿色）
:::
::: CTcode 场景2：字体大小继承失效
```html
<body style="font-size: 20px;">
  <p>Normal Text</p>
  <p class="small">Small Text</p>
</body>
```
```css
.small {
  font-size: 12px; /* 覆盖继承的20px */
}
```
:::
::: success 结果
 - "Normal Text" → 20px（继承）
 - "Small Text" → 12px（直接样式优先）
:::
##### 特殊注意点
1. `inherit` 关键字显式使用`color: inherit;`会主动继承父级样式，但优先级仍低于直接样式。
::: CTcode
```css
.child {
  color: inherit; /* 继承父级颜色 */
}
.special {
  color: red; /* 直接样式依然覆盖 */
}
```
:::
2. 不可继承的属性
部分属性（如 `margin`, `border`, `background`）默认不继承，不受此规则影响。
3. 伪元素例外
`:before/:after`伪元素默认继承父元素样式，但同样可被直接样式覆盖。




---

### 伪类与伪元素的特异性区别

#### 伪类（权重：类级别）
- 表示元素的特定状态
- 单冒号语法（CSS3中部分伪类支持双冒号，但单冒号仍有效）
- **权重计算**：等同于类选择器（`0-0-1-0`）
- **常见伪类**：
- 状态伪类：`:hover`, `:focus`, `:active`
- 结构伪类：`:nth-child()`, `:first-child`, `:last-of-type`
- 表单伪类：`:checked`, `:disabled`, `:valid`

#### 伪元素（权重：元素级别）
- 创建虚拟元素作为真实元素的特定部分
- 双冒号语法（CSS3规范）
- **权重计算**：等同于元素选择器（`0-0-0-1`）
- **常见伪元素**：
- `::before` - 在元素内容前插入
- `::after` - 在元素内容后插入
- `::first-line` - 选择文本首行
- `::selection` - 选择用户突出显示的部分


#### 案例1：伪类同权重单属性对比
> 为什么不比较不同权重？因为权重高了自然没可比性，高的优先嘛<br>

本案例比较单个属性
```css
/* 权重: (0,0,0,2) - 2个元素(li和a)(0,0,0,2)  */
/* 选中列表li中所有的a，不管中间有没有嵌套其它元素 */
li a { color: black; }

/* 权重: (0,0,1,2) - 1个伪类(:hover)(0,0,1,0) + 2个元素(li和a)(0,0,0,2)  */
li:hover a { color: blue; }

li a:hover { color: blue; }

/* 权重: (0,0,1,2) - 1个伪类(:first-child)(0,0,1,0) + 2个元素(li和a)(0,0,0,2)*/
li:first-child a { color: red; }
```
::: tip 既然权重一样，这里该怎么生效呢？
我们分两种情况，首先给出一个生效目标：<br>
```html
<ul>
  <li><a>项目1</a></li> <!-- 第一个子元素 -->
  <li><a>项目2</a></li>
</ul>
```
- 常规状态
  
  项目1：匹配的是`li a`、`li:first-child a`，`li:first-child a`权重高，最终显示为red红色

  > 为什么`li:hover a`不生效呢？这是因为常规状态下不满足前面的条件伪类`:hover`
  
  项目2：匹配`li a`，最终显示为black黑色
- 悬停状态(鼠标移动到项目1上)
  
  项目1：同时匹配`li:first-child a`和`li:hover a`，两者权重相同(0,0,1,2)<br>
  如果此时的定义顺序是：
  ```css
  li:hover a { color: blue; } /* 先定义 */
  li:first-child a { color: red; } /* 后定义 */
  ```
  此时`li:first-child a`会生效，最终显示为red红色，因为：<br>
  **当两个选择器权重相同时，无论选择器类型如何，定义顺序优先于选择器内容**<br>
  [特异性比较原则](#特异性比较原则)第四点

:::

#### 案例2：伪类同权重多属性对比
这里比较多属性的情况，是案例2的升级版，还带了`!important`
这是CSS样式：
::: CTcode
```css
/* 权重: (0,0,0,2) - 2个元素(li和a)(0,0,0,2)  */
li a { 
  color: black; 
  font-weight: bold;
  font-size: 20px; 
  /* 低权重选择器使用!important */
  font-family: Arial !important;
  /* 低权重选择器不使用!important */
  line-height: 1.8;
  /* 其它选择器没有的属性 */
  text-align: center;
}

/* 权重: (0,0,1,2) - 1个伪类(:hover)(0,0,1,0) + 2个元素(li和a)(0,0,0,2)  */
li:hover a {
  color: blue; 
  font-weight: 500;
  font-size: 50px; 
  font-family: Comic-mono !important;
  /* 高权重选择器不使用!important */
  line-height: 2.5;
}

li a:hover {
  color: blue; 
  font-weight: 600;
  font-size: 60px; 
  font-family: SFPlus !important;
  /* 高权重选择器使用!important */
  line-height: 2.5 !important;
}

/* 权重: (0,0,1,2) - 1个伪类(:first-child)(0,0,1,0) + 2个元素(li和a)(0,0,0,2)*/
li:first-child a { 
  color: yellow; 
  font-weight: 900;
  font-size: 36px; 
  font-family: Comic-mono;
  /* 高权重选择器使用!important */
  line-height: 4.5 !important;
}

.test {
  color: green; 
  font-weight: 600;
  font-size: 40px;
  font-family: KMHai;
  line-height: 4.5 !important;
}

```
:::
我们将分别应用于两个html结构，看看会发生什么<br>
第一份：
::: CTcode
```html
<ul>
  <li>
    <a>项目1</a>
  </li> 
  <li>
    <div class="test">
      <a>项目2</a>
    </div>
  </li>
</ul>
```
:::
::: note 结果
对于项目1：
- 默认状态：(应用`li:first-child a`、`li a`，不应用`li:hover a`、`li a:hover`)
  - color: yellow (`li:first-child a`覆盖了`li a`的black)
  - font-weight: 900 (`li:first-child a`覆盖了`li a`的bold)
  - font-size: 36px (`li:first-child a`覆盖了`li a`的20px)
  - font-family: Arial (`li a`使用了`!important`，权重更高)
  - line-height: 4.5 (`li:first-child a`使用了`!important`，权重更高)
  - text-align：center (`li a`独有属性，作为唯一来源)
- 悬停在li上：(应用`li:first-child a`、`li:hover a`、`li a`)
  - color: blue (`li:first-child a`后定义，覆盖同权重`li:hover a`)
  - font-weight: 900 (`li:first-child a`后定义，覆盖同权重`li:hover a`)
  - font-size: 36px (`li:first-child a`后定义，覆盖同权重`li:hover a`)
  - font-family: Comic-mono (`li:hover a`的`!important`，权重更高)
  - line-height: 4.5 (`li:first-child a`使用了`!important`，权重更高)
  - text-align：center (`li a`独有属性，作为唯一来源未被覆盖) 

- 悬停在a上：(应用`li:first-child a`、`li:hover a`、`li a:hover`、`li a`)
  - color: yellow (`li:first-child a`后定义，覆盖同权重`li:hover a`、`li a:hover`)
  - font-weight: 900 (`li:first-child a`后定义，覆盖同权重`li:hover a`、`li a:hover`)
  - font-size: 36px (`li:first-child a`后定义，覆盖同权重`li:hover a`、`li a:hover`)
  - font-family: SFPlus (`li:hover a`、`li a:hover`、`li a`都使用了`!important`，`li a`权重低淘汰，相同权重的`li:hover a`、`li a:hover`之间，因为`li a:hover`后定义优先生效)
  - line-height: 4.5 (`li:first-child a`和`li a:hover`都使用了`!important`且权重相同，但是`li:first-child a`后定义优先生效)
  - text-align：center (`li a`独有属性，作为唯一来源未被覆盖) 
:::
对于项目2：
> 不应用`li:first-child a`，因为嵌套了一层div，不是第一个直接子元素a
- 默认状态：(应用`.test`、`li a`，不应用`li:hover a`、`li a:hover`、`li:first-child a`)
  - color: black (`li a``.test`、)
  - font-weight: 900 ()
  - font-size: 36px ()
  - font-family: Arial ()
  - line-height: 4.5 ()
  - text-align：center ()
- 悬停在li上：()
  - color: blue ()
  - font-weight: 900 ()
  - font-size: 36px ()
  - font-family: Comic-mono ()
  - line-height: 4.5 ()
  - text-align：center () 

- 悬停在a上：()
  - color: yellow ()
  - font-weight: 900 ()
  - font-size: 36px ()
  - font-family: SFPlus ()
  - line-height: 4.5 ()
  - text-align：center () 
:::


第二份：
::: CTcode
```html
<ul>
  <li>
    <div>
      <a>项目1</a>
    </div>
  </li>
  <li>
    <a>项目2</a>
  </li> 
  <li>
    <div class="test">
      <a>项目3</a>
    </div>
  </li>
</ul>
```
:::






### 不可继承属性的特异性处理

尽管本文主要关注可继承属性，但不可继承属性的特异性规则同样适用，有其特殊性：

#### 关键差异
1. **作用域隔离**：
- 不可继承属性不会影响子元素
- 子元素需要显式设置这些属性

2. **覆盖规则**：
```css
/* 父元素 */
.parent {
background: yellow !important; /* 不可继承属性 */
}

/* 子元素 */
.child {
background: blue; /* 可以覆盖父级，因为不是继承 */
}
```

3. **特异性应用**：
- 当多个规则针对同一元素设置不可继承属性时，特异性规则正常应用
- 父级的`!important`不影响子元素的不可继承属性

#### 最佳实践
1. **避免过度使用`!important`**：
- 尤其是在不可继承属性上
- 会破坏正常的级联规则

2. **使用特异性而非`!important`**：
```css
/* 不佳 */
.btn { padding: 10px !important; }

/* 更好 */
nav .btn { padding: 10px; }
```

### 特异性与!important的交互

`!important`会改变正常的特异性规则：

#### 优先级金字塔（从高到低）

| 层级 | 类型              | 示例                                        | 权重 |
| ---- | ----------------- | ------------------------------------------- | ---- |
| 1    | 内联!important    | `style="color: red !important"`             | 最高 |
| 2    | ID!important      | `#header { color: blue !important }`        |      |
| 3    | 类/伪类!important | `.active:hover { color: green !important }` |      |
| 4    | 元素!important    | `p { color: black !important }`             |      |
| 5    | 普通ID选择器      | `#footer { color: gray }`                   |      |
| 6    | 普通类/伪类选择器 | `.card:hover { color: yellow }`             |      |
| 7    | 普通元素选择器    | `div { color: silver }`                     | 最低 |

#### !important注意事项
1. 同是`!important`时，正常比较特异性
2. 避免`!important`链式反应（一个`!important`导致需要更多`!important`）
3. 仅在必要时使用（如覆盖第三方库样式）
4. 使用更具体的选择器是更好的长期解决方案

理解选择器特异性是掌握CSS的核心基础。通过合理应用特异性规则，可以创建更可预测、更易维护的样式系统，避免不必要的`!important`使用，确保样式按预期应用。



---



### 继承属性
这里介绍属性继承的基本规则：<br>
1. 只影响可继承属性（字体、颜色等），非继承属性不受此影响<br>
下面是常见的**CSS 可继承属性**，这些属性会受到 !important "传染性"的影响：<br>

| 属性类别    | 属性示例                                                                                                                                                                             |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 文本属性    | `font`, `font-family`, `font-size`, `font-weight`, `font-style`, `text-align`, `text-indent`,`text-transform`, `letter-spacing`, `word-spacing`, `line-height`, `color`, `direction` |
| 列表属性    | `list-style`, `list-style-type`, `list-style-position`, `list-style-image`                                                                                                           |
| 表格属性    | `border-collapse`, `border-spacing`                                                                                                                                                  |
| 其它属性    | `visibility`, `cursor`, `quotes`, `white-space`                                                                                                                                      |
| 部分SVG属性 | `fill`, `stroke`, `stroke-width`                                                                                                                                                     |

以下是一些常见的**不可继承属性**：
| 属性类别   | 属性示例                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------- |
| 盒模型相关 | `margin：外边距`, `padding：内边距`, `border：边框`, `width：宽度`, `height：高度`, `display：显示方式` |
| 定位相关   | `position：定位方式`, `top、right、bottom、left：定位偏移`, `float：浮动`, `clear：清除浮动`            |
| 背景相关   | `background：背景`, `background-color：背景颜色`, `background-image：背景图片`                          |
| 其它属性   | `overflow：溢出处理`, `z-index：层叠顺序`, `opacity：透明度`                                            |

2. `!important`只影响其所在的属性声明，不会影响同规则内的其他属性的继承行为，即普通声明子属性优先，无声明继承父属性，非继承属性看直接设置<br>
我们来看一个例子：
::: CTcode 
```css{2}
.parent {
  color: red !important; /* 只有此属性受 !important 影响 */
  font-size: 20px;       /* 普通声明 */
  background: yellow;    /* 普通声明 */
}
```
```html{3}
<div class="parent">
  此文本：
  <span style="color: blue; font-size: 16px; background: lightblue;">
    子元素文本
  </span>
</div>
```
:::
::: info 结果分析
| 属性       | 父元素设置     | 子元素设置 | 最终效果 | 原因                       |
| ---------- | -------------- | ---------- | -------- | -------------------------- |
| color      | red !important | blue       | 红色     | !important 强制继承        |
| font-size  | 20px           | 16px       | 16px     | 普通声明，子元素覆盖       |
| background | yellow         | lightblue  | 浅蓝色   | 非继承属性，子元素设置优先 |

可以看到，只有设置了`!important`的属性，才会被继承。不会影响到其它属性的普通规则声明，其它属性该怎么来就怎么来。
:::


#### 父子元素类选择器同名可继承属性
设置一个简单的父元素选择器和子元素选择器拥有同名可继承属性的情况，都各只有一个类选择器
::: CTcode
```css
/* 父元素选择器 */
.parent {
  color: red !important;
  font-weight: bold;
}
/* 子元素选择器 */
.child {
  color: blue;
  font-weight: normal;
}
```
```html
<div class="parent">
  父元素文本（红色粗体）
  <div class="child">
    子元素文本（蓝色，但字体重量为正常？）
  </div>
</div>
```
:::
::: info 结果
|    属性     | 是否能继承 |   父元素设置   | 子元素设置 |    最终效果    |         原因         |
| :---------: | :--------: | :------------: | :--------: | :------------: | :------------------: |
|    color    |     ✅      | red !important |    blue    | 强制覆盖为红色 | !important 强制继承  |
| font-weight |     ✅      |      bold      |   normal   |      正常      | 普通声明，子元素覆盖 |

**父级和子级拥有同名可继承属性的情况下，子元素优先覆盖**
:::

#### 父子元素类选择器拥有不同名继承属性
我们来设想一种情况：<br>同时存在父元素类选择器、带有内联样式和双类选择器(同类选择器+子元素类选择器)、子元素同名类选择器、子元素不同名类选择器的情况。
代码漏了一个.parent.child与.parent同名属性的情况，还有只有.child的情况
::: CTcode
```css
.parent {
  color: red !important; /* 强制继承 */
  font-size: 20px;       /* 普通声明 */
  background: yellow;    /* 普通声明 */
}
/* 场景1：同名子选择器存在但不重置关键属性 */
.parent .child {
  font-weight: bold;          /* 仅添加新属性 */
}
/* 场景2：不同名子选择器存在但不重置关键属性 */
.child-alt {
  text-decoration: underline; /* 仅添加新属性 */
}
```
---
```html{1,7,8,17,26}
<div class="parent">
  <strong>父元素</strong> - 受所有样式影响：
  <div>颜色：!important 红色（强制生效）</div>
  <div>背景：半透明黄（仅限父元素区域）</div>
  
  <!-- 实验组1：内联样式 -->
  <div class="child" 
       style="color: blue; font-size: 16px; background: lightblue;">
    <strong>实验组1：内联样式</strong>
  </div>
  
  <!-- 实验组2：同名子选择器未设置背景 -->
  <div class="child">
    <strong>实验组2：同名子选择器</strong>
  </div>
  
  <!-- 实验组3：不同名子选择器未设置背景 -->
  <div class="child-alt">
    <strong>实验组3：不同名子选择器</strong>
  </div>
</div>
```
:::
**总结一下结果如何呢？**
::: info 实验组1：同名子选择器带内联样式
|    属性     | 是否能继承 |   父元素设置   | 同名子选择器设置 | 内联样式设置 |    最终效果    |              原因              |
| :---------: | :--------: | :------------: | :--------------: | :----------: | :------------: | :----------------------------: |
|    color    |     ✅      | red !important |        无        |     blue     | 强制覆盖为红色 |      !important 强制继承       |
|  font-size  |     ✅      |      20px      |        无        |     16px     |      16px      |      普通声明，子元素覆盖      |
| background  |     ❌      |     yellow     |        无        |  lightblue   |     浅蓝色     |   非继承属性，子元素设置优先   |
| font-weight |     ✅      |       无       |       粗体       |      无      |      粗体      | 普通规则，同名子选择器直接作用 |
:::
::: info 实验组2：同名子选择器未设置背景、内联样式
|    属性     | 是否能继承 |   父元素设置   | 同名子选择器设置 |    最终效果     |              原因              |
| :---------: | :--------: | :------------: | :--------------: | :-------------: | :----------------------------: |
|    color    |     ✅      | red !important |        无        | 强制覆盖为红色  |      !important 强制继承       |
|  font-size  |     ✅      |      20px      |        无        |      20px       |       普通规则，继承父级       |
| background  |     ❌      |     yellow     |        无        | <mark>无</mark> |          不可继承属性          |
| font-weight |     ✅      |       无       |       粗体       |      粗体       | 普通规则，同名子选择器直接作用 |
:::
::: info 实验组3：不同名子选择器未设置背景、内联样式
|      属性       | 是否能继承 |   父元素设置   | 不同名子选择器设置 |    最终效果     |               原因               |
| :-------------: | :--------: | :------------: | :----------------: | :-------------: | :------------------------------: |
|      color      |     ✅      | red !important |         无         | 强制覆盖为红色  |       !important 强制继承        |
|    font-size    |     ✅      |      20px      |         无         |      20px       |        普通规则，继承父级        |
|   background    |     ❌      |     yellow     |         无         | <mark>无</mark> |           不可继承属性           |
| text-decoration |     ✅      |       无       |       下划线       |     下划线      | 普通规则，不同名子选择器直接作用 |
:::
从上述实验我们可以得出结论：<br>
- `!important`仅作用于其修饰的属性，会强制覆盖子元素的同名属性，不会使同选择器内的其它普通属性获得额外优先级
- `!important`不会"传染"给子选择器，如`.parent .child {}`这个选择器的意思是选择parent下所有child，但是`.parent`父选择器里的`!important`并不会影响子选择器`.child`里
- 子元素
- 内联样式能覆盖父级所有普通声明（如`font-size`、`background`）
- 内联样式低于任何`!important`声明



#### 混合继承与非继承属性时使用`!important`
让我们来看看同时存在继承与非继承属性时，使用`!important`的运作规则<br>
::: CTcode
```css
.parent {
/* 可继承属性 */
color: red !important;
font-family: Arial !important;
line-height: 1.8 !important;

/* 非继承属性 */
background: lightyellow !important;
border: 2px solid orange !important;
padding: 20px !important;
}

.child {
/* 尝试覆盖 */
color: blue;
font-family: 'Courier New';
line-height: 1.2;

/* 设置非继承属性 */
background: lightblue;
border: 2px dashed navy;
padding: 10px;
margin: 10px;
display: block;
}
```
```html
<div class="parent">
    父元素内容
    <div class="child">
      子元素内容
    </div>
</div>
```
:::
::: info 结果
|      属性       | 是否能继承 |     父元素设置      | 子元素设置  |    最终效果    |                 原因                 |
| :-------------: | :--------: | :-----------------: | :---------: | :------------: | :----------------------------------: |
|  color文本颜色  |     ✅      |   red !important    |    blue     | 强制覆盖为红色 |         !important 强制继承          |
| font-family字体 |     ✅      |  Arial !important   | Courier New |     Arial      |         !important 强制继承          |
| line-height行高 |     ✅      |   1.8 !important    |     1.2     |      1.8       |         !important 强制继承          |
| background背景  |     ❌      |   浅黄 !important   |    浅蓝     |      浅蓝      |       不可继承，子元素直接设置       |
|   border边框    |     ❌      | 橙色实线 !important | 海军蓝虚线  |   海军蓝虚线   |       不可继承，子元素直接设置       |
|  padding内边距  |     ❌      |   20px !important   |    10px     |      10px      |       不可继承，子元素直接设置       |
|  margin外边距   |     ❌      |       未设置        |    10px     |      10px      | 不可继承且父级未设置，子元素直接设置 |
| display显示类型 |     ❌      |       未设置        |    block    |     block      | 不可继承且父级未设置，子元素直接设置 |

**使用`!important`的情况下，对于可继承属性，父级直接覆盖子级，对于不可继承属性，子级直接设置**
:::

#### 多层嵌套与覆盖
这里设置三级起步的样式，来看下规则如何运作的：<br>
::: CTcode
```css
.grandparent {
  font-size: 24px !important;
  color: green !important;
}

.parent {
  font-size: 20px; /* 试图覆盖 */
  color: purple !important; /* 重要声明 */
}

.child {
  font-size: 16px;
  color: orange;
}
```
```html
<div class="grandparent">
  祖元素文本（24px，绿色）
  <div class="parent">
    父元素文本（24px，紫色）
    <div class="child">
      子元素文本（24px，紫色）
    </div>
  </div>
</div>
```
:::
::: info 结果
1. font-size:
- 祖元素 24px !important
- 父元素 20px (普通声明，无法覆盖)
- 子元素 16px (普通声明，无法覆盖)
- 最终所有文本都是 24px

2. color:
- 祖元素 green !important
- 父元素 purple !important (相同优先级，后声明胜出)
- 子元素 orange (普通声明，无法覆盖)
- 最终父元素和子元素都是紫色

**多级嵌套的情况下：<br>对于可继承属性，无`important`竞争情况，祖元素直接覆盖父子元素同名属性
<br>对于可继承属性，存在`important`竞争情况，来源优先级相同，后声明的胜出
<br>普通声明来源优先级不够，无法覆盖`!important`**
:::



## 内联样式的特殊性
   - 内联样式的特殊性最高，直接写在HTML元素上的样式。
   - 内联样式的特殊性为 1-0-0-0，无论选择器的特异性如何，内联样式总会覆盖其他样式。
   ::: warning 注意
    内联样式属于作者样式（普通），优先级高于普通选择器
    但低于任何 !important 声明
   :::

   ::: CTcode
   ```css
      <div style="color: blue">...</div>
    ```
   :::

1. **继承的样式**：
- 继承的样式优先级最低（低于所有直接样式）
- 显式设置 `inherit` 值会按正常规则计算

2. **`@layer` 级联层规则**：
```css
@layer base, theme;

@layer theme {
.title { color: red; }
}

@layer base {
.title { color: blue; } /* 最终生效：蓝色 */
}
```
- 层顺序优先于源代码顺序
- 未分层样式 > 分层样式

3. **应避免的做法**：
- 过度使用 `!important`（难以覆盖）
- 滥用ID选择器（特异性过高）
- 超长选择器链（降低可维护性）

---