---
outline: [2, 6]
tag: ['vue', 'vue3', '基础知识']
---

# 在scoped中设定全局样式

我们在`<style scoped>`中添加的样式，是针对当前组件的，不会影响到其他组件。

但是有一个问题，对说的就是你！`el-pagination`组件的样式，有很多样式是挂载在全局或者说只有全局样式才能生效的。

这时候我们就要使用`:global()`来设定全局样式了。

## 什么是:global()？

`:global()`是Vue3中用来设定全局样式的一个伪类。是 Vue3 `<style scoped>` 的「穿透语法」，用来告诉编译器：

这段 CSS 不要加 data-v-hash 属性选择器，直接扔到全局去。

它的作用是将括号中的选择器，转换为全局选择器，从而可以在scoped中设定全局样式。

```vue
<style scoped>
/* 只影响当前组件 */
.local-class { color: red; }

/* 穿透到全局，影响任何组件 */
:global(.el-pagination) { background: #132144; }
</style>
```

编译后:

```vue
/* 加了 hash，仅当前组件生效 */
.local-class[data-v-1a2b3c] { color: red; }

/* 没加 hash，全局生效 */
.el-pagination { background: #132144; }
```

`:global()` 就是 **「在 scoped 文件里写全局 CSS」** 的语法糖，

专门用来覆盖外挂组件、第三方库、body 级弹窗——

Element Plus 的 `el-pagination`、`el-select 下拉`、`el-tooltip` 都靠它搞定