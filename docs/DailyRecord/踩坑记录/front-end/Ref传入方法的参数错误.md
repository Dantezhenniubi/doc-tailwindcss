---
outline: [2, 6]
tags: ['vue', '前端']
---

# Ref传入方法的参数错误

## 问题描述
我在捣鼓切换背景图方案时，发现这个情况：
::: CTcode 错误写法
```vue
<button
  class="fixed bottom-6 right-6 p-2 rounded-full bg-white/70"
  @click="nextBg(isDark)"
>
  换背景
</button>
import { useData, withBase } from 'vitepress';
import { nextBg, preloadAll, useCurrentBgUrl } from '../store/bgStore';
const { isDark, theme } = useData();
```
:::
为什么我这样调用nextBg方法，传入方法的isDark是undefined？但是我黑暗模式切换按钮那边的又能正常传入？

::: CTcode 正常
```vue
import { inject, watchPostEffect, ref } from 'vue';
import { useData } from 'vitepress';
import { nextBg } from '../store/bgStore';

const { isDark, theme } = useData();

const toggleAppearance = inject('toggle-appearance', () => {
  isDark.value = !isDark.value;
  nextBg(isDark);
});
```
:::

**请注意，此例子中，nextBg()方法内部使用了`isDark.value`来获取值。**

## 解决方案
问题在于在**模板中**直接调用 nextBg(isDark) 时，isDark 的值是 undefined。

原因在于 useData() 返回的 isDark 是一个 ref 对象，而 **Vue 模板会自动解包 ref，导致原始 ref 对象丢失**。

我们看到，虽然在`<script>`导入中已经手动解包：
::: CTcode
```vue
const { isDark } = useData() // 此时 isDark 是一个 ref 对象
```
:::
由于nextBg函数内是使用`isDark.value`，**所以函数期望的`isDark`是一个ref对象，而不是布尔值**。

在模板中直接使用 isDark 时，Vue 会自动解包 ref：
::: CTcode
<button @click="nextBg(isDark)"> 
<!-- 相当于传递 isDark.value (布尔值) 而不是 ref 对象 -->
:::
这样传进去，函数在处理时就相当于`isDark.value.value`，从一个值中读取属性值，这显然就会导致undefined。

而在下面的函数中，是直接传入解包出的ref对象，是函数所期望的参数：
::: CTcode
```vue
const toggleAppearance = inject('toggle-appearance', () => {
    isDark.value = !isDark.value // 操作 ref
    nextBg(isDark) // ✅ 传递 ref 对象
});
```
:::

> 我们就没有什么方法在不修改nextBg函数的情况下，给模板的事件传递ref对象吗？

**当然是有的~**

**方法1：明确传递的是ref对象**
::: CTcode
```vue
<button @click="nextBg(isDarkRef)">换背景</button>

<script setup>
// 重命名 isDark 为 isDarkRef 以明确它是 ref
const { isDark: isDarkRef } = useData()
</script>
```
:::
**方法2：使用包装函数**
::: CTcode
```vue
<button @click="handleClick">换背景</button>

<script setup>
const handleClick = () => nextBg(isDark) // 在函数作用域内传递 ref
</script>
```
:::



::: warning 疑问
使用toRefs()函数可行吗？
```vue
<button @click="nextBg(toRefs(isDark))">换背景</button>
```
**不可行！**
- toRefs 是为 响应式对象 设计的（如 `reactive()` 创建的对象）
- 你的 isDark 是一个 Ref 对象 `(Ref<boolean>)`，而不是响应式对象
- 这将得到一个空对象：`{}`（因为 ref 对象没有任何可枚举属性）
- `toRefs(isDark)` 返回一个空对象 `{}`（类型为 `Record<string, never>`）
:::

::: tip 为什么不推荐模板内复杂表达式
- 可读性：模板应专注于布局，逻辑应放在 JS 部分
- 性能：每次渲染都会重新执行整个表达式
- 调试：模板中的错误更难追踪
- 类型安全：失去 TypeScript 类型检查
结论： **坚持在 `<script setup>` 中处理逻辑，这是 Vue 组合式 API 的最佳实践。**
:::

