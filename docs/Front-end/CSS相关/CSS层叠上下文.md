# 层叠上下文
层叠上下文是 CSS 中用于管理元素层叠顺序的机制。它决定了元素在 Z 轴上的显示顺序，`z-index` 只在同一个层叠上下文中有效。

**层叠上下文 = 浏览器图层管理器**

## 创建层叠上下文的条件

以下属性会创建一个新的层叠上下文：
`position: absolute/relative/fixed/sticky`且 `z-index` 不为 `auto`。
`z-index`值不为`auto`的`flex`或`grid`容器。
`opacity` 值小于 1。
`transform`、`filter`、`will-change` 等属性。
## 层叠顺序规则

在同一个层叠上下文中，元素的层叠顺序从后到前依次为：
> 根 → 负 → 静态 → 定位(auto) → 正

| 层级                 | 示例                                             | 口诀   |
| -------------------- | ------------------------------------------------ | ------ |
| 层叠上下文的根元素   | 上下文自身                                       | 地基   |
| `z-index` 为负的元素   | `z-index: -1`                                      | 地下室 |
| 非定位元素（静态流） | 默认 `position: static`                            | 地面   |
| 定位元素             | `absolute`/`relative`/`fixed`/`sticky`且 `z-index` 为 `auto` | 地面+  |
| `z-index` 为正的元素   | `z-index: 1`                                       | 高楼   |

创建层叠上下文的常见触发器:
| 触发器                      | 示例                            | 备注             |
| --------------------------- | ------------------------------- | ---------------- |
| 定位 + 非 `auto z-index`      | `relative z-10`                   | 最常用           |
| `Flex/Grid` + 非 `auto z-index` | `flex z-0`                        | 现代布局必备     |
| 透明/滤镜/变换              | `opacity:0.99` / `filter:blur(1px)` | 性能优化时常触发 |
| Will-change 层              | `will-change: transform`          | 强制新建图层     |
| 根元素                      | `<html>`                          | 永远存在         |

定位 + 非 auto z-index 是日常 90% 场景。

## 性能层：will-change
这里把will-change单独拎出来谈谈。

✅ 作用
提前告诉浏览器「哪些属性即将变化」；
浏览器预分配 GPU 层、预渲染，避免卡顿；
只在变化前短暂存在，变化后立刻移除。

❌ 不要滥用：
- ❌全局加：`* {  will-change: transform; }` 会让浏览器资源爆炸
- ❌长期挂着：动画结束后不移除，GPU/内存爆炸，长期占用影响性能
- ❌预测性优化：不确定有没有动画就加，得不偿失
- ❌容器乱加：乱给大容器加层，会触发重绘，影响性能

✅ 正确姿势：
- ✅动画或变换发生前 200 ms 通过 JS 动态加（一般提前2个`requestAnimationFrame`）
- ✅动画或变换结束后，立刻移除 `will-change(will-change: auto)`，释放资源
- ✅动画或变换过程中，不要修改 `will-change` 属性，会触发重绘
  
::: warning 关于重排和重绘
浏览器的重排和重绘，可以参考[这篇文章](https://fedev.cn/performance/repaint-and-reflow.html)
:::

- ✅持续动画的场景可以一直加，比如持续旋转的图标
- ✅精准打击，只给**真正动画的元素**加，**不给容器瞎加**

::: CTcode 示例（Tailwind 场景）
```ts
// 动画前短暂加
element.classList.add('will-change-transform')

// 动画结束立刻删
element.addEventListener('transitionend', () => {
  element.classList.remove('will-change-transform')
})
```
:::

⚠️ 副作用
- 强制创建层叠上下文 → 可能影响 `z-index`
- 长期挂着 → GPU/内存爆炸
- 全局加 → 页面变慢甚至崩溃

因为会强制创建层叠上下文，所以一定要测试页面的其它功能是否正常，特别是：
- 毛玻璃效果（backdrop-filter）
- 层叠顺序（z-index）
- 定位效果（absolute/relative/fixed/sticky）
- 其它依赖层叠上下文的效果
