---
outline: [2, 6]
tags: ['tailwindcss', '前端']
---

# TailwindCSS设置背景图

## 问题描述
我想在TailwindCSS中设置背景图，但是发现`bg-[url($img)]`并不会生效，想动态传递背景图链接做不到。


## 解决方案
Tailwind为类扫描源代码的方式非常简单，即使用正则表达式提取每个可能是类名的字符串，所以不支持动态类名的设置。
所以我初步方案直接使用了style内联样式来设置动态背景图，就像这样：
::: CTcode
```vue
<div class="min-h-screen bg-center bg-cover" :style="{ backgroundImage: `url(${bgUrl})` }">
```
:::

最后我在项目里采取的方案是传入动态类名：

[切换背景图方案](../../../Front-end/TailwindCSS/切换背景图方案.md)

::: CTcode
```vue
<!-- 纹理背景图 PNG（最底层） -->
<div :class="`min-h-screen relative overflow-hidden bg-center ${bgClass}`">
    <!-- 渐变遮罩：只裁背景，不裁内容 -->
    <div class="absolute inset-0 bg-mask-container pointer-events-none" aria-hidden="true">
        <img v-if="$isDark.value == false" :src="withBase('/LightBG/waves.svg')" alt="" />
    </div>
</div>
```
:::