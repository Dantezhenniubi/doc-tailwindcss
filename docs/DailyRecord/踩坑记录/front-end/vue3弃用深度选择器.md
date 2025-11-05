---
outline: [2, 6]
tags: ['踩坑记录', 'vue', 'vue3', '前端']
---

# Vue3 弃用深度选择器

请查看官方说明：
https://github.com/vuejs/rfcs/blob/master/active-rfcs/0023-scoped-styles-changes.md

https://cn.vuejs.org/api/sfc-css-features.html#deep-selectors


## 使用说明

处于 `scoped` 样式中的选择器如果想要做更“深度”的选择，也即：影响到子组件，可以使用 `:deep()` 这个伪类：
```vue
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>
```

## 其它的样式语法


### 插槽选择器
默认情况下，作用域样式不会影响到 `<slot/>` 渲染出来的内容，因为它们被认为是父组件所持有并传递进来的。使用 `:slotted` 伪类以明确地将插槽内容作为选择器的目标：
```vue
<style scoped>
:slotted(div) {
  color: red;
}
</style>
```

### 全局选择器
如果想让其中一个样式规则应用到全局，比起另外创建一个 `<style>`，可以使用 `:global` 伪类来实现 (看下面的代码)：
```vue
<style scoped>
:global(.red) {
  color: red;
}
</style>
```

### 混合使用局部和全局样式
你也可以在同一个组件中同时包含作用域样式和非作用域样式：
```vue
<style>
/* 全局样式 */
</style>

<style scoped>
/* 局部样式 */
</style>
```

### CSS 中的 `v-bind()`

单文件组件的 `<style>` 标签支持使用 `v-bind` CSS 函数将 CSS 的值链接到动态的组件状态：

```vue
<template>
  <div class="text">hello</div>
</template>

<script>
export default {
  data() {
    return {
      color: 'red'
    }
  }
}
</script>

<style>
.text {
  color: v-bind(color);
}
</style>
```

这个语法同样也适用于 `<script setup>`，且支持 JavaScript 表达式 (需要用引号包裹起来)：
```vue
<script setup>
import { ref } from 'vue'
const theme = ref({
    color: 'red',
})
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```
实际的值会被编译成哈希化的 CSS 自定义属性，因此 CSS 本身仍然是静态的。自定义属性会通过内联样式的方式应用到组件的根元素上，并且在源值变更的时候响应式地更新。
