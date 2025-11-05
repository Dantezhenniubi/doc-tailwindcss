---
outline: [2, 6]
tag: ['vue3', '组件封装', '组件库', 'element-plus']
---

# 二次封装一个ELPagination分页组件

在二次封装EL的组件之前，请先全局引入element-plus的样式，避免默认样式失效。

`import 'element-plus/dist/index.css'`


## 第一种：使用h函数渲染
使用h函数渲染，以及父组件使用vue3.5+的新函数`useTemplateRef()`

### 关于`useTemplateRef()`

- 「重命名绑定」

`useTemplateRef('input')` 只是把模板里 `ref="input"` 的那个 DOM 节点 映射成一个 响应式引用，名字随意：
```ts
// 两种写法一样
const inputRef = useTemplateRef('input')
const inputRef = useTemplateRef<HTMLInputElement>('input')
```
模板里 `ref="input"` → 你手里叫 `inputRef`，**本质还是同一个 DOM 节点**。

- 「自动类型推导」
因为你在模板里写的是 `<input>`，Vue 3.5 会自动推导出 `HTMLInputElement`，零手动声明。

> ✅ `watch` 监听哪个？
**监听 `inputRef` 本身（Ref 对象），不是字符串**：
```ts
import { watch, useTemplateRef } from 'vue'

const inputRef = useTemplateRef<HTMLInputElement>('input')

/* 监听 DOM 是否挂载/变化 */
watch(inputRef, (newVal, oldVal) => {
  if (newVal) {
    console.log('DOM 已挂载', newVal.value)
  } else {
    console.log('DOM 已卸载')
  }
}, { immediate: true })
```

::: tip 既然是3.5+的新函数，那3.0+怎么办呢？
:::

我们来对比一下传统方法

- 版本差异

| 特性             | `useTemplateRef()` | `ref()`      |
| ---------------- | ------------------ | ------------ |
| **最低版本**     | **Vue 3.5+**       | **Vue 3.0+** |
| **是否官方推荐** | ✅（≥ 3.5）         | ✅（全版本）  |

- 写法差异

| 场景         | `useTemplateRef()` | `ref()`        |
| ------------ | ------------------ | -------------- |
| **模板写法** | **字符串键**       | **变量名**     |
| **JS 写法**  | **零类型声明**     | **需手动声明** |

- 代码对比

```vue
<script setup lang="ts">
// ===== Vue ≥ 3.5 =====
import { useTemplateRef } from 'vue'
const inputRef = useTemplateRef<HTMLInputElement>('inputBox')   // 自动推导 HTMLInputElement

// ===== Vue < 3.5 =====
import { ref } from 'vue'
const inputRef = ref<HTMLInputElement | null>(null)             // 需手动声明
</script>

<template>
  <!-- ===== 两种写法功能等价 ===== -->
  <input ref="inputBox" />   <!-- useTemplateRef 用字符串 -->
  <input :ref="inputRef" />  <!-- ref 用变量名 -->
</template>
```



### 封装示例


::: CTcode
```vue
<!-- 参考视频封装而来https://www.bilibili.com/video/BV1bDe1z1Eyr/ -->
<!-- ts写法 -->
<template>
  <div class="NavListPage">
    <!-- 穿透属性、事件、插槽、方法、类型 -->
    <component :is="h(ElPagination, { ...$attrs, ref: changeRef }, $slots)"></component>
  </div>
</template>

<script setup lang="ts">
import { h, getCurrentInstance } from 'vue';
import type { ComponentInstance } from 'vue';
import { ElPagination } from 'element-plus';

const vm = getCurrentInstance();
function changeRef(exposed) {
  console.log('exposed', exposed);
  vm.exposed = exposed;
}

// 断言成组件类型，提取组件实例，实现支持类型提示，只支持类vscode编辑器，因为vscode集成了real language tools
defineExpose({} as ComponentInstance<typeof ElPagination>);

</script>
```
:::

父组件：
```vue
<template>
<NavListPage
  ref="pageRef"
  v-model:current-page="currentPage"
  v-model:page-size="pageSize"
  :total="filteredSites.length"
  layout="slot, total, jumper, prev, pager, next, sizes"
  :page-sizes="[8, 12, 16, 20]"
  background
  @size-change="currentPage = 1"
>
<span class="text-sm text-sky-500">哈哈哈哈</span>
</NavListPage>
</template>

<script setup lang="ts">
const ELPage = useTemplateRef('pageRef'); // 获取分页组件的引用

onMounted(() => { 
  console.log('获取到的分页组件实例', ELPage.value)
});
</script>
```

嗯这种封装方式虽然支持类VScode编辑器的提示，但是不支持WebStorm编辑器的提示

且本示例未完善写法，仅提供思路。存在类型不明确、拓展性差的问题

## 第二种：常规
使用[defineExpose](https://cn.vuejs.org/api/sfc-script-setup#defineexpose)函数，显式指定在 `<script setup>` 组件中要暴露出去的属性。

### 封装示例
在组件中：
```vue
<template>
  <div class="NavListPage">
    <ElPagination
      v-bind="$attrs"
      ref="paginationRef"
    >
      <template v-for="(value, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}" />
      </template>
    </ElPagination>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElPagination } from 'element-plus';

const paginationRef = ref<InstanceType<typeof ElPagination> | null>(null);

// 暴露底层实例（外部可通过 ref.paginationRef 访问）
defineExpose({
  paginationRef,
});
</script>
```
(待补充)

## 使用

## 补充说明

::: warning 值得注意的问题
Element Plus官方在Pagination分页组件中，给出了以下说明：

我们现在会检查一些不合理的用法，如果发现分页器未显示，可以核对是否违反以下情形：

- total 和 page-count 必须传一个，不然组件无法判断总页数；优先使用 page-count;
- 如果传入了 current-page，必须监听 current-page 变更的事件（@update:current-page），否则分页切换不起作用；
- 如果传入了 page-size，且布局包含 page-size 选择器（即 layout 包含 sizes），必须监听 page-size 变更的事件（@update:page-size），否则分页大小的变化将不起作用。

事件​

size-change	page-size 改变时触发	

current-change	current-page 改变时触发	

change 2.4.4	current-page 或 page-size 更改时触发	

prev-click	用户点击上一页按钮改变当前页时触发	

next-click	用户点击下一页按钮改变当前页时触发	


以上事件不推荐使用（但由于兼容的原因仍然支持，在以后的版本中将会被删除）；如果要监听 current-page 和 page-size 的改变，使用 v-model 双向绑定是个更好的选择。
:::

这意味着，我们最好使用的是双向绑定的模式，即：
```vue
<el-pagination v-model:current-page="currentPage" />
```