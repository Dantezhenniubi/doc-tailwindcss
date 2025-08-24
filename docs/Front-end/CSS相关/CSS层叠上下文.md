# 层叠上下文
层叠上下文是 CSS 中用于管理元素层叠顺序的机制。它决定了元素在 Z 轴上的显示顺序，`z-index` 只在同一个层叠上下文中有效。
## 创建层叠上下文的条件

以下属性会创建一个新的层叠上下文：
`position: absolute/relative/fixed/sticky`且 `z-index` 不为 `auto`。
`z-index`值不为`auto`的`flex`或`grid`容器。
`opacity` 值小于 1。
`transform`、`filter`、`will-change` 等属性。
## 层叠顺序规则

在同一个层叠上下文中，元素的层叠顺序从后到前依次为：

层叠上下文的根元素。

z-index 为负的元素。

非定位元素（position: static）。

定位元素（position: absolute/relative/fixed/sticky）且 z-index 为 auto。

z-index 为正的元素。